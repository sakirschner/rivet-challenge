import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from '../features/employeesList/employeesSlice'
import employeesDisplayReducer from '../features/employeesDisplay/employeesDisplaySplice'

const rootReducer = combineReducers({
    employees: employeesReducer,
    employeesDisplay: employeesDisplayReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
