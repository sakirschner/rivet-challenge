import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { EmployeesListPage } from '../features/employeesList/EmployeesListPage'
import { EmployeeDetailsPage } from '../features/employeeDetails/EmployeeDetailsPage'
import { AddEmployeePage } from '../features/addEmployee/AddEmployeePage'

import { setCurrentDisplayType } from '../features/employeesDisplay/employeesDisplaySplice'

import './App.css'
import { UpdateEmployeePage } from '../features/updateEmployee/UpdateEmployeePage'

type CurrentDisplay = 
  | {
    type: 'employees'
    }
  | {
    type: 'employeeDetails'
    employeeId: number
  }
  | {
    type: 'addEmployee'
  }
  | {
    type: 'updateEmployee'
    employeeId: number
  }

const App: React.FC = () => {
  const dispatch  = useDispatch()

  const { displayType, employeeId } = useSelector(
    (state: RootState) => state.employeesDisplay
  )

  const showEmployeesList = () => {
    dispatch(setCurrentDisplayType({ displayType: 'employees' }))
  }

  const showEmployeeDetails = (employeeId: number) => {
    dispatch(setCurrentDisplayType( {displayType: 'details', employeeId }))
  }

  const showUpdateEmployee = (employeeId: number) => {
    dispatch(setCurrentDisplayType( {displayType: 'updateEmployee', employeeId }))
  }

  const showAddEmployee = () => {
    dispatch(setCurrentDisplayType({ displayType: 'addEmployee' }))
  }

  let content

  if (displayType === 'employees') {
    content = (
      <EmployeesListPage 
        showEmployeeDetails={showEmployeeDetails}
        showAddEmployee={showAddEmployee}
      />
    )
  } else if (displayType === 'addEmployee'){
    content = (
      <AddEmployeePage
        showEmployeesList={showEmployeesList}
      />
    )
  } else if (employeeId !== null) {
    const key = `${employeeId}`
    if (displayType === 'details') {
    content = (
      <EmployeeDetailsPage
        key={key}
        employeeId={employeeId}
        showEmployeesList={showEmployeesList}
        showUpdateEmployee={showUpdateEmployee}
      />
    )
    } else if (displayType === 'updateEmployee') {
      content = (
        <div>
            <UpdateEmployeePage
                key={key}
                employeeId={employeeId}
            />
        </div>
    )
    }
  }
  
  return <div className="App">{content}</div>
}

export default App