import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from '../features/employeesList/employeesSlice'
import employeesDisplayReducer from '../features/employeesDisplay/employeesDisplaySplice'
import employeeToAddReducer from '../features/addEmployee/addEmployeeSlice'
import employeeToPutReducer from '../features/updateEmployee/updateEmployeeSlice'

const rootReducer = combineReducers({
    employees: employeesReducer,
    employeesDisplay: employeesDisplayReducer,
    employeeToAdd: employeeToAddReducer,
    empolyeeToPut: employeeToPutReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
