import React, {useEffect, useState} from 'react'

import {DDAlert, DDChart, DDDataGrid, ExampleComponent, sendInfoAlert, sendSuccessAlert} from '@djammadev/react-lib'
import {Button, Checkbox, Container} from '@material-ui/core'
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {blue, green} from '@material-ui/core/colors';
import * as moment from 'moment';
import '@djammadev/react-lib/dist/index.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const App = () => {

  const columns = [
    {field: 'col1', headerName: 'Column 1', width: 250},
    {field: 'col2', headerName: 'Column 2', width: 150, resizable: true},
  ];

  const rows = [
    {id: 1, col1: 'Hello', col2: 'World'},
    {id: 2, col1: 'XGrid', col2: 'is Awesome'},
    {id: 3, col1: 'Material-UI', col2: 'is Amazing'},
  ];

  const [data, setData] = useState([]);

  const [autoLoad, setAutoLoad] = useState(true)
  const [dataFromParent, setDataFromParent] = useState(true)
  const [autoChart, setAutoChart] = useState(true)
  const [chartWithData, setChartWithData] = useState(true)

  const onGridReady = (params) => {
    params.api.setRowData(rows)
    params.api.setColumnDefs(columns);
  }

  useEffect(() => {
    sendInfoAlert({
      title: 'This is an info',
      message: "I'm the best for ever...",
      timeout: 1000
    });
    fetch('/users.json')
      .then(res => res.json())
      .then(response => setData(response.entities))
  }, []);

  const columnMapper = (column) => {
    let mapping = {
      "String": "text",
      "Integer": "number",
      "Short": "number",
      "Long": "number",
      "Double": "number",
      "Date": "date",
      "List": "array"
    }
    let myColumn = Object.assign({}, column);
    myColumn.type = mapping[myColumn.type] || myColumn.type;
    return myColumn;
  }

  const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: blue,
    },
  });

  const getLabels = (data) => {
    return ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  }

  const getData = (data) => {
    return [12, 19, 3, 5, 2, 3];
  }

  const getLabelColor = (data) => {
    return [
      {r: 255, g: 99, b: 132, a: 0.2},
      {r: 54, g: 162, b: 235, a: 0.2},
      {r: 255, g: 206, b: 86, a: 0.2},
      {r: 75, g: 192, b: 192, a: 0.2},
      {r: 153, g: 102, b: 255, a: 0.2},
      {r: 255, g: 159, b: 64, a: 0.2}
    ]
  }

  const classes = useStyles();

  return <Container>
    <DDAlert show={true}/>

    <ExampleComponent text="Djamma Dev React Library Example 😄"/>

    <ThemeProvider theme={theme}>
      <Button variant="contained" color="secondary" className={classes.margin} onClick={(e) => {
        console.log('----');
        sendInfoAlert({
          title: 'This is an info notification',
          message: "I'm the best for ever...",
          timeout: 5000
        });
      }}>Alert Info</Button>
    </ThemeProvider>
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" className={classes.margin} onClick={(e) => {
        console.log('----');
        sendSuccessAlert({
          title: 'This is a success notification',
          message: "I'm the best for ever...",
          timeout: 5000
        });
      }}>Alert Success</Button>
    </ThemeProvider>

    <h2>
      Auto load data
      <Checkbox
        checked={autoLoad}
        value={autoLoad}
        onChange={(e) => setAutoLoad(e.target.checked)}/>
    </h2>
    {
      autoLoad &&
      <DDDataGrid
        rowModelType={"infinite"}
        columnsPath={"descriptions/user.json"}
        dataPath={"users.json"}
        columns={columns}
        rows={rows}
        columnMapper={columnMapper}
        style={{height: 300, width: '100%', marginBottom: 20}}/>}

    <h2>
      Passing data from parent
      <Checkbox
        checked={dataFromParent}
        value={dataFromParent}
        onChange={(e) => setDataFromParent(e.target.checked)}/>
    </h2>
    {
      dataFromParent &&
      <DDDataGrid
        onGridReady={onGridReady}
        columns={columns}
        rows={rows}
        style={{height: 300, width: '100%', marginBottom: 20}}/>
    }

    <h2>
      Chart Js
      <Checkbox
        checked={autoChart}
        value={autoChart}
        onChange={(e) => setAutoChart(e.target.checked)}/>
    </h2>
    {
      autoChart &&
      <DDChart
        labelKey={"votes"}
        getLabels={getLabels}
        getData={getData}
        getLabelColor={getLabelColor}
        height={100}
        width={400}/>
    }

    <h2>
      Chart With Data
      <Checkbox
        checked={chartWithData}
        value={chartWithData}
        onChange={(e) => setChartWithData(e.target.checked)}/>
    </h2>
    {
      chartWithData &&
      <DDChart type={"bar"}
               labelKey={[(item) => moment(item.createDate).format('YYYY-MM-DD') || 'Unknown', (item) => item.gender === 'MALE' ? 'Male' : 'Female']}
               backgroundOpacity={0.4}
               borderOpacity={1}
               borderWidth={1}
               data={data}
               height={200}
               width={400}/>
    }
  </Container>
}

export default App
