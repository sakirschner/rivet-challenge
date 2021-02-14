import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchEmployee } from '../../features/employeesList/employeesSlice'

import { UpdateEmployeeForm } from './UpdateEmployeeForm'
import { PutModal } from '../../components/PutModal'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

import './UpdateEmployeePage.css'

interface UpEmpProps {
	employeeId: number
	showEmployeeDetails: (employeeId: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			'& > * + *': {
				marginTop: theme.spacing(2)
			}
		}
	})
)

export const UpdateEmployeePage = ({
	employeeId,
	showEmployeeDetails
}: UpEmpProps) => {
	const classes = useStyles()

	const dispatch = useDispatch()

	const employee = useSelector(
		(state: RootState) => state.employees.employeesById[employeeId]
	)

	const error = useSelector((state: RootState) => state.empolyeeToPut.error)
	const isLoading = useSelector(
		(state: RootState) => state.empolyeeToPut.isLoading
	)

	useEffect(() => {
		if (!employee) {
			dispatch(fetchEmployee(employeeId))
		}

		//in case employee is alreay loaded
		window.scrollTo({ top: 0 })
	}, [employeeId, employee, dispatch])

	if (error) {
		return (
			<div className={classes.root}>
				<Alert severity="error">
					Something went wrong - {error.toString()}
				</Alert>
				<div className="formContainer">
					<UpdateEmployeeForm
						employee={employee}
						showEmployeeDetails={showEmployeeDetails}
					/>
				</div>
			</div>
		)
	}

	let renderedPage = isLoading ? (
		<h1 className="saving">Saving...</h1>
	) : (
		<div className="formContainer">
			<PutModal showEmployeeDetails={showEmployeeDetails} employee={employee} />
			<UpdateEmployeeForm
				employee={employee}
				showEmployeeDetails={showEmployeeDetails}
			/>
		</div>
	)

	return <div>{renderedPage}</div>
}
