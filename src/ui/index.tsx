import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/react'
import store from '../services/redux/store';
import MainRouter from './components/commons/Router'

const App = () => (
  <>
    <Global styles={css`
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      h1, h2, h3, h4 {
        letter-spacing: 0.3px;
      }
    `}/>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </>
)

ReactDOM.render(<App />, document.getElementById('wrap'))