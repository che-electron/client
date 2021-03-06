import * as React from 'react';

import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from '../store';

import AppContainer from '../containers/AppContainer';

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store} ><AppContainer /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})
