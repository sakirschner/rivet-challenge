import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createEmployee } from '../../api/employeeAPI'

import { AppThunk } from '../../app/store'

interface employeeToAdd {
    first_name: string
    last_name: string
    phone: string
    email: string
    address: string
    city: string
    st: string
    zip: string,
}

interface extras {
    isLoading: boolean,
    error: string | null
}

type employeeToAddState = { } & employeeToAdd & extras

let empleeToAddInitialState: employeeToAddState = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    st: '',
    zip: '',
    isLoading: false,
    error: null
}

function startLoading(state: employeeToAddState) {
    state.isLoading = true
}
  
function loadingFailed(state: employeeToAddState, action: PayloadAction<string>) {
    state.isLoading = false
    state.error = action.payload
}

function loadingSuccess(state: employeeToAddState) {
    state.isLoading = false
    state.error = null
}

const employeeToAdd = createSlice({
    name: 'employeeToAdd',
    initialState: empleeToAddInitialState,
    reducers: {
        postEmployeeStart: startLoading,
        setEmployeeToAdd(state, action: PayloadAction<employeeToAdd>) {
            const {first_name, last_name, phone, 
                   email, address, city, st, zip} = action.payload
            state.first_name = first_name
            state.last_name = last_name
            state.phone = phone
            state.email = email
            state.address = address
            state.city = city
            state.st = st
            state.zip = zip
        },
        postEmployeeSuccess: loadingSuccess,
        postEmployeeFailure: loadingFailed
    }
})

export const {
    postEmployeeStart,
    setEmployeeToAdd,
    postEmployeeSuccess,
    postEmployeeFailure
} = employeeToAdd.actions

export default employeeToAdd.reducer

export const postEmployee = (first_name: string, last_name: string, phone: string, 
                              email: string, address: string, city: string, 
                              st: string, zip: string): AppThunk => async dispatch => {
    const payload = {
        'first_name': first_name, 
        'last_name' : last_name, 
        'phone': phone, 
        'email': email, 
        'address': address, 
        'city': city, 
        'state': st, 
        'zip' : zip
    }
    
    try {
        dispatch(postEmployeeStart())
        await createEmployee(payload)
        dispatch(postEmployeeSuccess())
    } catch (err) {
        dispatch(postEmployeeFailure(err.message))
    }
} 