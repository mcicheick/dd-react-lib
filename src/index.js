import React from 'react'

import styles from './styles.module.css'

export const ExampleComponent = ({text}) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export {
  DDAlert,
  sendAlert,
  sendErrorAlert,
  sendSuccessAlert,
  sendInfoAlert,
  sendWarningAlert
} from './alert';

export {
  DDDataGrid
} from './data-grid';

export {
  DDChart
} from './chart';

export {
  DDSignIn
} from './sign-in';
