import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from '../features/employeesList/employeesSlice'
import employeesDisplayReducer from '../features/employeesDisplay/employeesDisplaySplice'
import employeeToAddReducer from '../features/addEmployee/addEmployeeSlice'

const rootReducer = combineReducers({
    employees: employeesReducer,
    employeesDisplay: employeesDisplayReducer,
    employeeToAdd: employeeToAddReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
