import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Employee, EmployeesResult, getEmployees, getEmployee } from '../../api/employeeAPI'
import { AppThunk } from '../../app/store'

interface EmployeesState {
    employeesById: Record<number, Employee>
    currentEmployees: number[]
    isLoading: boolean
    error: string | null
}

const employeesInitialState: EmployeesState = {
    employeesById: {},
    currentEmployees: [],
    isLoading: false,
    error: null,
}

function startLoading(state: EmployeesState) {
    state.isLoading = true
}

function loadingFailed(state: EmployeesState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

const employees = createSlice({
    name: 'employees',
    initialState: employeesInitialState,
    reducers: {
        getEmployeeStart: startLoading,
        getEmployeesStart: startLoading,
        getEmployeeSuccess(state, {payload}: PayloadAction<Employee>) {
            const { id } = payload
            state.employeesById[id] = payload
            state.isLoading = false
            state.error = null
        },
        getEmployeesSuccess(state, {payload}: PayloadAction<EmployeesResult>) {
            const { employees } = payload
            state.isLoading = false
            state.error = null

            employees.forEach(employee => {
                state.employeesById[employee.id] = employee
            })

            state.currentEmployees = employees.map(employee => employee.id)
        },
        getEmployeeFailure: loadingFailed,
        getEmployeesFailure: loadingFailed,
    }
})

export const {
    getEmployeesStart,
    getEmployeesSuccess,
    getEmployeeStart,
    getEmployeeSuccess,
    getEmployeeFailure,
    getEmployeesFailure
} = employees.actions

export default employees.reducer

export const fetchEmployees = (): AppThunk => async dispatch => {
    try {
        dispatch(getEmployeesStart())
        const employees = await getEmployees()
        dispatch(getEmployeesSuccess(employees))
    } catch (err) {
        dispatch(getEmployeesFailure(err.toString()))
    }
}

export const fetchEmployee = ( id:number ): AppThunk => async dispatch => {
    try {
        dispatch(getEmployeeStart())
        const employee = await getEmployee(id)
        dispatch(getEmployeeSuccess(employee))
    } catch (err) {
        dispatch(getEmployeeFailure(err.toString()))
    }
}