import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { EmployeesListPage } from '../features/employeesList/EmployeesListPage'
import { EmployeesList } from '../features/employeesList/EmployeesList'

import { setCurrentDisplayType } from '../features/employeesDisplay/employeesDisplaySplice'

import './App.css'
import { EmployeeDetailsPage } from '../features/employeeDetails/EmployeeDetailsPage'

type CurrentDisplay = 
  | {
    type: 'employees'
    }
  | {
    type: 'comments'
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

  let content

  if (displayType === 'employees') {
    content = (
      <>
        <EmployeesListPage 
          showEmployeeDetails={showEmployeeDetails}
        />
      </>
    )
  } else if (employeeId !== null) {
    const key = `${employeeId}`
    content = (
      <EmployeeDetailsPage
        key={key}
        employeeId={employeeId}
        showEmployeesList={showEmployeesList}
      />
    )
  }
  
  return <div className="App">{content}</div>
}

export default App
