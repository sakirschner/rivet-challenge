import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateEmployee } from '../../api/employeeAPI'

import { AppThunk } from '../../app/store'

interface employeeToPut {
	id: number | null
	first_name: string
	last_name: string
	phone: string
	email: string
	address: string
	city: string
	st: string
	zip: string
	notes: string
}

interface extras {
	isLoading: boolean
	error: string | null
}

type employeeToPutState = employeeToPut & extras

let empleeToPutInitialState: employeeToPutState = {
	id: null,
	first_name: '',
	last_name: '',
	phone: '',
	email: '',
	address: '',
	city: '',
	st: '',
	zip: '',
	notes: '',
	isLoading: false,
	error: null
}

function startLoading(state: employeeToPutState) {
	state.isLoading = true
}

function loadingFailed(
	state: employeeToPutState,
	action: PayloadAction<string>
) {
	state.isLoading = false
	state.error = action.payload
}

function loadingSuccess(state: employeeToPutState) {
	state.isLoading = false
	state.error = null
}

const employeeToPut = createSlice({
	name: 'employeeToPut',
	initialState: empleeToPutInitialState,
	reducers: {
		putEmployeeStart: startLoading,
		setEmployeeToPut(state, action: PayloadAction<employeeToPut>) {
			const {
				id,
				first_name,
				last_name,
				phone,
				email,
				address,
				city,
				st,
				zip,
				notes
			} = action.payload
			state.id = id
			state.first_name = first_name
			state.last_name = last_name
			state.phone = phone
			state.email = email
			state.address = address
			state.city = city
			state.st = st
			state.zip = zip
			state.notes = notes
		},
		putEmployeeSuccess: loadingSuccess,
		putEmployeeFailure: loadingFailed
	}
})

export const {
	putEmployeeStart,
	setEmployeeToPut,
	putEmployeeSuccess,
	putEmployeeFailure
} = employeeToPut.actions

export default employeeToPut.reducer

export const putEmployee = (
	id: number,
	first_name: string,
	last_name: string,
	phone: string,
	email: string,
	address: string,
	city: string,
	st: string,
	zip: string,
	notes: string
): AppThunk => async (dispatch) => {
	const payload = {
		first_name: first_name,
		last_name: last_name,
		phone: phone,
		email: email,
		address: address,
		city: city,
		state: st,
		zip: zip,
		notes: notes
	}

	try {
		dispatch(putEmployeeStart())
		await updateEmployee(id, payload)
		dispatch(putEmployeeSuccess())
	} catch (err) {
		dispatch(putEmployeeFailure(err.message))
	}
}
