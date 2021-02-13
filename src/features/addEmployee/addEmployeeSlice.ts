import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface employeeToAdd {
    first_name: string
    last_name: string
    phone: string
    email: string
    address: string
    city: string
    st: string
    zip: string
}

type employeeToAddState = { } & employeeToAdd

let empleeToAddInitialState: employeeToAddState = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    st: '',
    zip: '',
}

const employeeToAdd = createSlice({
    name: 'employeeToAdd',
    initialState: empleeToAddInitialState,
    reducers: {
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
        }
    }
})

export const {
    setEmployeeToAdd
} = employeeToAdd.actions

export default employeeToAdd.reducer