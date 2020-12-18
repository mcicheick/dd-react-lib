import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab'

import styles from './index.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const DD_ALERT_EVENT = 'dd-alert-event';

export function DDAlert(props) {
  const classes = useStyles();
  const [alert, setAlert] = useState('info');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(props.show);

  const componentWillUnmount = () => {
    let $alert = document.getElementById('DDAlert');
    if ($alert) {
      $alert.removeEventListener(DD_ALERT_EVENT);
    }
  }

  const componentDidMount = () => {
    let $alert = document.getElementById('DDAlert');
    if ($alert) {
      $alert.addEventListener(DD_ALERT_EVENT, handleAlert);
      $alert.addEventListener('click', () => setShow(false));
    }
    return componentWillUnmount;
  }

  const handleAlert = (event) => {
    let detail = event.detail;
    setAlert(detail.alert);
    setTitle(detail.title);
    setMessage(detail.message);
    setShow(true);
    if (detail.timeout > 0) {
      setTimeout(() => {
        setShow(false);
      }, detail.timeout);
    }
  }

  useEffect(componentDidMount, []);

  return (
    <div id={'DDAlert'} className={styles.Alert + (show ? '' : ' ' + styles.hide)}>
      <div className={classes.root}>
        <Alert severity={alert}>
          <AlertTitle>{title}</AlertTitle>
          <div dangerouslySetInnerHTML={{__html: message}}/>
        </Alert>
      </div>
    </div>
  );
}

export function sendAlert(event) {
  let $alert = document.getElementById('DDAlert');
  if ($alert) {
    $alert.dispatchEvent(new CustomEvent(event.type, {detail: event}));
  }
}

export function sendErrorAlert(event) {
  sendAlert({type: DD_ALERT_EVENT, alert: 'error', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendSuccessAlert(event) {
  sendAlert({type: DD_ALERT_EVENT, alert: 'success', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendInfoAlert(event) {
  sendAlert({type: DD_ALERT_EVENT, alert: 'info', title: event.title, message: event.message, timeout: event.timeout})
}

export function sendWarningAlert(event) {
  sendAlert({type: DD_ALERT_EVENT, alert: 'warning', title: event.title, message: event.message, timeout: event.timeout})
}
