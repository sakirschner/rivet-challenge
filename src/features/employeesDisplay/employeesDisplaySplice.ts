import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CurrentDisplay {
    displayType: 'employees' | 'details' | 'addEmployee' | 'updateEmployee'
    employeeId: number | null 
}

interface CurrentDisplayPayload {
    displayType: 'employees' | 'details' | 'addEmployee' | 'updateEmployee'
    employeeId?: number
}

type CurrentDisplayState = {

} & CurrentDisplay

let initialState: CurrentDisplayState = {
    displayType: 'employees',
    employeeId: null
}

const employeesDisplaySlice = createSlice({
    name: 'employeesDisplay',
    initialState,
    reducers: {
        setCurrentDisplayType(
            state, 
            action: PayloadAction<CurrentDisplayPayload>
        ) {
            const { displayType, employeeId = null} = action.payload
            state.displayType = displayType
            state.employeeId = employeeId
        }
    }
})

export const {
    setCurrentDisplayType
} = employeesDisplaySlice.actions

export default employeesDisplaySlice.reducer