import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { EmployeesList } from './EmployeesList'
import { fetchEmployees } from './employeesSlice'

import './EmployeeListPage.css'

interface EmpListProps {
	showEmployeeDetails: (employeeId: number) => void
	showAddEmployee: () => void
}

export const EmployeesListPage = ({
	showEmployeeDetails,
	showAddEmployee
}: EmpListProps) => {
	const dispatch = useDispatch()

	const {
		currentEmployees,
		isLoading,
		error: employeesError,
		employeesById
	} = useSelector((state: RootState) => state.employees)

	const employees = currentEmployees.map((employee) => employeesById[employee])

	useEffect(() => {
		dispatch(fetchEmployees())
	}, [dispatch])

	if (employeesError) {
		return (
			<div>
				<h1>Something went wrong...</h1>
				<div>{employeesError.toString()}</div>
			</div>
		)
	}

	let renderedList = isLoading ? (
		<h1 className="loading">Loading...</h1>
	) : (
		<EmployeesList
			employees={employees}
			showEmployeeDetails={showEmployeeDetails}
			showAddEmployee={showAddEmployee}
		/>
	)

	return <div className="list">{renderedList}</div>
}
