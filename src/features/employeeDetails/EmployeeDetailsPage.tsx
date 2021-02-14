import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchEmployee } from '../../features/employeesList/employeesSlice'

import { EmployeeMeta } from './EmployeeMeta'

interface EmpDetailsProps {
	employeeId: number
	showEmployeesList: () => void
	showUpdateEmployee: (employeeId: number) => void
}

export const EmployeeDetailsPage = ({
	employeeId,
	showEmployeesList,
	showUpdateEmployee
}: EmpDetailsProps) => {
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

	const backToEmployeesListButton = (
		<button onClick={showEmployeesList}>Back To Employees</button>
	)

	let content

	if (employee === null) {
		content = (
			<div>
				<p>Something went wrong loading Employee ID {employeeId}...</p>
				{backToEmployeesListButton}
			</div>
		)
	} else {
		content = (
			<div>
				<EmployeeMeta
					employee={employee}
					showEmployeesList={showEmployeesList}
					showUpdateEmployee={showUpdateEmployee}
				/>
			</div>
		)
	}

	return <div>{content}</div>
}
