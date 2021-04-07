import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { Global, css } from '@emotion/react'
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
    <RecoilRoot>
      <MainRouter />
    </RecoilRoot>
  </>
)

ReactDOM.render(<App />, document.getElementById('wrap'))