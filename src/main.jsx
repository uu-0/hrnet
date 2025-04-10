import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import { createGlobalStyle } from 'styled-components'
import { colors } from './styles/colors'
import { montserratFont } from './styles/font'

import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import Error from './pages/Error'


const GlobalStyle = createGlobalStyle`
  html {
    ${montserratFont}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    background: linear-gradient(90deg, ${colors.blue}, ${colors.pink}, ${colors.orange});
    margin-top: 100px;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <Router>
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