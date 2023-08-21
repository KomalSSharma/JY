import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './features/store.js'
import { Provider } from 'react-redux'

const portalContainer = document.createElement('div');
portalContainer.id = 'portal-container';
document.body.appendChild(portalContainer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
