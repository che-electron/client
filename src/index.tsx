import { Provider } from 'react-redux'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer'
import registerServiceWorker from './registerServiceWorker'
import store from './store'

import 'bootstrap'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
