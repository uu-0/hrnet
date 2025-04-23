import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import { createGlobalStyle } from 'styled-components'
import { colors } from './styles/colors'
import { systemUiFont } from './styles/font'

import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import Error from './pages/Error'


const GlobalStyle = createGlobalStyle`
  html {
    ${systemUiFont}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    background: linear-gradient(90deg, ${colors.blue}, ${colors.pink}, ${colors.orange});
    margin-top: 50px;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .visually-hidden {
  position: absolute !important;
  height: 1px; 
  width: 1px; 
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}

`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <Router basename="/hrnet">
          <GlobalStyle />
          <Routes>      
            <Route path="/" element={<CreateEmployee />} />
            <Route path="/EmployeeList" element={<EmployeeList />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Provider>
  </React.StrictMode>
)