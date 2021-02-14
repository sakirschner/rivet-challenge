import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateEmployee } from '../../api/employeeAPI'
import { fetchEmployees } from '../../features/employeesList/employeesSlice'

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
	modalOpen: boolean
	submitted: boolean
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
	error: null,
	modalOpen: false,
	submitted: false
}

function openModal(state: employeeToPutState) {
	state.modalOpen = true
}

function closeModal(state: employeeToPutState) {
	state.modalOpen = false
}

function formSubmitted(state: employeeToPutState) {
	state.submitted = true
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
	state.modalOpen = true
}

function resetState(state: employeeToPutState) {
	state.error = null
	state.submitted = false
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
		putEmployeeFailure: loadingFailed,
		setModalOpen: openModal,
		setModalClose: closeModal,
		setSubmitted: formSubmitted,
		resetEmployeeToPutState: resetState
	}
})

export const {
	putEmployeeStart,
	setEmployeeToPut,
	putEmployeeSuccess,
	putEmployeeFailure,
	setModalOpen,
	setModalClose,
	setSubmitted,
	resetEmployeeToPutState
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
		dispatch(fetchEmployees())
	} catch (err) {
		dispatch(putEmployeeFailure(err.message))
	}
}
