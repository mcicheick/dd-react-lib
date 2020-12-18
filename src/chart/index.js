import React, {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js'
import _ from 'underscore';

export function DDChart(props) {

  const [chartApi, setChartApi] = useState(null);

  const ctx = useRef(null);

  const destroyApi = () => {
    if (chartApi) {
      chartApi.destroy();
    }
  }

  const getLabels = (data) => {
    if (typeof props.getLabels === 'function') {
      return props.getLabels(data)
    } else if (Array.isArray(props.getLabels)) {
      return props.getLabels;
    }
    let labelKey = props.labelKey || 'label';
    let groupedData = _.groupBy(data, labelKey);
    return Object.keys(groupedData);
  }

  const getData = (data) => {
    if (typeof props.getData === 'function') {
      return props.getData(data)
    } else if (Array.isArray(props.getData)) {
      return props.getData;
    }
    let labelKey = props.labelKey || 'label';
    let groupedData = _.groupBy(data, labelKey);
    return Object.values(groupedData).map(value => value.length);
  }

  const getLabelColor = (data) => {
    if (typeof props.getLabelColor === 'function') {
      return props.getLabelColor(data)
    } else if (Array.isArray(props.getLabelColor)) {
      return props.getLabelColor;
    }
    return getLabels(data).map(label => {
      return {
        r: Math.ceil(Math.random() * 255),
        g: Math.ceil(Math.random() * 255),
        b: Math.ceil(Math.random() * 255),
        a: 0.2
      };
    });
  }

  const getBackgroundColor = (labelColor) => {
    return labelColor.map(color => {
      color.a = 0.2;
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    });
  }

  const getBorderColor = (labelColor) => {
    return labelColor.map(color => {
      color.a = 1;
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    });
  }

  const initChart = () => {
    let labels = getLabels(props.data); // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
    let data = getData(props.data); // [12, 19, 3, 5, 2, 3]
    let labelColor = getLabelColor(props.data);
    let backgroundColor = getBackgroundColor(labelColor);
    let borderColor = getBorderColor(labelColor);
    const chart = new Chart(ctx.current, {
      type: props.type || 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `# of ${props.labelKey}`,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    setChartApi(chart);
    return destroyApi;
  }

  useEffect(initChart, [props.data]);

  return <canvas ref={ctx} height={props.height} width={props.width}/>
}
