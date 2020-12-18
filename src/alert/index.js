import React from 'react';

import $ from 'jquery'

import './index.css'

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: 'primary',
      title: '',
      message: '',
      show: false
    };
    this.handleAlert = this.handleAlert.bind(this);
  }

  componentDidMount() {
    let $alert = $('.Alert');
    $alert.on('alert-event', this.handleAlert);
    $alert.on('click', () => this.setState({show: false}));
  }

  componentWillUnmount() {
    $('.Alert').removeEventListener('alert-event');
  }

  handleAlert(event) {
    this.setState({
      alert: event.alert,
      title: event.title,
      message: event.message,
      show: true
    });
    if (event.timeout > 0) {
      setTimeout(() => {
        this.setState({
          show: false
        });
      }, event.timeout);
    }
  }

  render() {
    return (
      <div className={'Alert' + (this.state.show ? '' : ' hide')}>
        <div className={'alert alert-' + this.state.alert} role="alert">
          <h4 className="alert-heading text-center">{this.state.title}</h4>
          <hr/>
          <div dangerouslySetInnerHTML={{__html: this.state.message}}/>
        </div>
      </div>
    );
  }
}

export default Alert;

export function sendAlert(event) {
  let alertElement = $('.Alert');
  if (alertElement) {
    alertElement.trigger(event);
  }
}

export function sendErrorAlert(event) {
  sendAlert({type: 'alert-event', alert: 'danger', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendSuccessAlert(event) {
  sendAlert({type: 'alert-event', alert: 'success', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendInfoAlert(event) {
  sendAlert({type: 'alert-event', alert: 'info', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendWarningAlert(event) {
  sendAlert({type: 'alert-event', alert: 'warning', title: event.title, message: event.message, timeout: event.timeout})
}
