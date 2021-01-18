import React, {useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';

import {sendErrorAlert} from '../alert'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import styles from './index.css'

const DEFAULT_PAGE_SIZE = 100;

export function DDDataGrid(props) {

  const [gridApi, setGridApi] = useState(null);

  /**
   * If props.onGridReady is defined all agGrid management is delegated to the parent component.
   * @param params
   */
  const onGridReady = (params) => {
    setGridApi(params.api);

    if (props.onGridReady) {
      props.onGridReady(params);
    }
    if (params.api && props.dataPath) {
      params.api.setDatasource(getDatasource());
    }
  }

  /**
   * Send event to the parent component if props.onCellValueChanged is defined.
   * @param event
   */
  const onCellValueChanged = (event) => {
    if (props.onCellValueChanged) {
      props.onCellValueChanged(event);
    } else {
      upsertItem(event);
    }
  }

  /**
   * it props.dataPath is defined upsert item selected.
   * @param event
   */
  const upsertItem = (event) => {
    if (!props.dataPath) {
      return;
    }
    let item = {
      id: event.data.id
    };
    let value = event.value;
    let field = event.colDef.field;
    item[field] = value;
    if (event.colDef.type === 'object') {
      item[field] = {id: value * 1};
    }
    let method = 'PUT';
    if (item.id === null) {
      item = event.data;
      method = 'POST';
    }
    fetch(props.dataPath, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(response => {
        if (response.code && response.code / 100 !== 2) {
          sendErrorAlert({
            title: event.colDef.headerName,
            message: response.message
          });
        } else {
          event.node.setData(response);
          event.api.refreshCells({force: true, rowNodes: [event.node]});
        }
      })
      .catch(error => {
        sendErrorAlert({
          title: event.colDef.headerName,
          message: error.message || 'Error on update'
        });
      });
  }

  /**
   * Convert {schemes: []} into schemes list by adding default formatter function.
   * If props.columnMapper is defined it is called at the end to update colDef value.
   * @param result
   * @returns {*[]}
   */
  const getSchemes = (result) => {
    let myFormatter = (key) => {
      return (data) => {
        if (!data) {
          return ''
        }
        let myKey = key;
        if (Array.isArray(data[myKey])) {
          return `${data[myKey].length} element${data[myKey].length > 1 ? 's' : ''}`
        }
        if (data[myKey] && typeof data[myKey] === 'object') {
          return data[myKey].id
        }
        return data[myKey];
      };
    };
    let myMapper = scheme => {
      let formatter = myFormatter(scheme.field);
      let cellRenderer = (data) => {
        return formatter(data.data);
      }
      scheme.formatter = formatter;
      scheme.cellRenderer = cellRenderer;
      return props.columnMapper ? props.columnMapper(scheme) : scheme;
    };
    return (result.schemes || []).map(myMapper);
  }

  /**
   * Retrieve columns definition using props.columnsPath.
   * This action is triggered when gridApi is defined and props.columnsPath.
   */
  const getColumnDefs = () => {
    if (!gridApi) {
      return;
    }
    let url = `${props.columnsPath}${getQueryParams()}`;
    fetch(url, {headers: {'Accept': 'application/json'}})
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(result => {
        console.log('result', result);
        if (result.code && result.code / 100 !== 2) {
          throw Error(result.message);
        } else {
          let columns = getSchemes(result);
          console.log('columns', columns);
          if (gridApi) {
            gridApi.setColumnDefs(columns);
          }
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  /**
   * Convert { [param: string]: string; } into queryParams: url-encoded
   * @param params
   * @returns {string}
   */
  const getQueryParams = (params?: { [param: string]: string; }) => {
    let query = '';
    if (params) {
      for (const param in params) {
        if (query === '') {
          query = `${param}=${params[param]}`;
        } else {
          query = query + `&${param}=${params[param]}`;
        }
      }
    }
    return (query !== '' ? '?' : '') + query;
  }

  /**
   * Search using ag-grid filter model.
   * @param body : AdGrid Filter Data Model
   * @param params : Query Params
   * @returns {Promise<T>}
   */
  const search = (body: any | null, params?: { [param: string]: string; }) => {
    let url = `${props.dataSearchPath || props.dataPath}`;
    let method = 'POST';
    if (params) {
      let query = getQueryParams(params)
      url = `${url}${query}`;
    }
    if (!props.dataSearchPath) {
      method = 'GET'
    }
    let config = {
      method: method
    }
    if (method === 'POST') {
      config.body = JSON.stringify(body);
      config.headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    }
    return fetch(url, config).then(res => res.json());
  }

  /**
   * @see search
   * @param filter
   * @param pageNumber
   * @param pageSize
   * @returns {Promise<T>}
   */
  const searchData = (filter: any, pageNumber: number = -1, pageSize: number = -1) => {
    let params = {};
    params['page'] = `${pageNumber}`;
    params['perPage'] = `${pageSize}`;
    return search(filter, {...params, ...(props.params || {})});
  }

  /**
   * called from getDatasource.
   * @param pageNumber
   * @param pageSize
   * @returns {Promise<T>}
   */
  const getData = (pageNumber: number = -1, pageSize: number = -1) => {
    let url = `${props.dataPath}${getQueryParams({page: pageNumber, perPage: pageSize, ...(props.params || {})})}`;
    return fetch(url, {headers: {'Accept': 'application/json'}}).then(res => res.json())
  }

  /**
   * AgGrid DataSource
   * @returns {{getRows: IDatasource.getRows}}
   */
  const getDatasource = () => {
    return {
      getRows: (params) => {
        const pageNumber = params.endRow / DEFAULT_PAGE_SIZE;
        let request;
        const fields = [];
        let myFilterModel = params.filterModel;
        if (props.filterModel) {
          myFilterModel = Object.assign({}, myFilterModel, props.filterModel);
        }
        for (const field in myFilterModel) {
          if (myFilterModel.hasOwnProperty(field)) {
            fields.push(field);
          }
        }
        const filter = {
          filterModel: myFilterModel,
          sortModel: params.sortModel
        };
        if (fields.length || params.sortModel.length) {
          request = searchData(filter, pageNumber, DEFAULT_PAGE_SIZE);
        } else {
          request = getData(pageNumber, DEFAULT_PAGE_SIZE);
        }
        request
          .then((page: any) => {
            console.log('page', page);
            const totalCount = (page.page - 1) * page.pageSize + (page.entities || []).length;
            if (gridApi) {
              gridApi.setInfiniteRowCount(Math.max(totalCount, page.totalEntityCount));
            }
            params.successCallback(page.entities || [], Math.max(totalCount, page.totalEntityCount));
          })
          .catch(error => {
            console.log(error);
            params.failCallback();
          });
      }
    };
  }

  useEffect(() => {
    if (props.columnsPath) {
      getColumnDefs({});
    }
  }, [gridApi]);

  return (
    <div className="ag-theme-alpine" style={{...props.style}}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={props.rows}
        columnDefs={props.columns}
        animateRows={props.animateRows}
        enableCellChangeFlash={props.enableCellChangeFlash}
        enableColResize={props.enableColResize}
        rowModelType={props.rowModelType}
        onCellValueChanged={onCellValueChanged}/>
    </div>
  );
}
