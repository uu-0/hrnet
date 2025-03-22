import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import CreateEmployee from './pages/CreateEmployee'
import EmployeeList from './pages/EmployeeList'
import Error from './pages/Error'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
      <Router>
        <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/EmployeeList" element={<EmployeeList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
  </React.StrictMode>
)