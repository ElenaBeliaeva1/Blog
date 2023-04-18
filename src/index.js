import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import './index.scss'
import App from './components/app'

const initialState = {
  isLogged: false,
  user: {
    username: null,
    token: null,
    email: null,
    avatar: null,
  },
}

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, isLogged: true, user: action.payload }
    case 'LOG_OUT':
      localStorage.clear()
      location.reload()
      return { isLogged: false, user: null }
    case 'EDIT_PROFILE':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))
export const store = createStore(rootReducer, initialState, enhancer)
/* eslint-enable */

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
