import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { EmployeesListPage } from '../features/employeesList/EmployeesListPage'

import './App.css'
import { EmployeesList } from '../features/employeesList/EmployeesList'

const App: React.FC = () => {
  let content

  content = (
    <React.Fragment>
      <EmployeesListPage />
    </React.Fragment>
  )

  return <div className="App">{content}</div>
}

export default App
