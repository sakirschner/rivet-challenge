import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchEmployee } from '../../features/employeesList/employeesSlice'

import { UpdateEmployeeForm } from './UpdateEmployeeForm'

import './UpdateEmployeePage.css'

interface UpEmpProps {
	employeeId: number
	showEmployeeDetails: (emploeeId: number) => void
}

export const UpdateEmployeePage = ({
	employeeId,
	showEmployeeDetails
}: UpEmpProps) => {
	const dispatch = useDispatch()

	const employee = useSelector(
		(state: RootState) => state.employees.employeesById[employeeId]
	)

	useEffect(() => {
		if (!employee) {
			dispatch(fetchEmployee(employeeId))
		}

		//in case employee is alreay loaded
		window.scrollTo({ top: 0 })
	}, [employeeId, employee, dispatch])

	return (
		<div className='formContainer'>
			<UpdateEmployeeForm
				employee={employee}
				showEmployeeDetails={showEmployeeDetails}
			/>
		</div>
	)
}
