import { combineReducers } from '@reduxjs/toolkit'

import employeesReducer from '../features/employeesList/employeesSlice'

const rootReducer = combineReducers({
    employees: employeesReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
