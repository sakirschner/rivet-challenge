import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AddEmployeeForm } from './AddEmployeeForm'
import { setEmployeeToAdd } from './addEmployeeSlice'
import { RootState } from '../../app/rootReducer'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

import './AddEmployeePage.css'

interface AddEmpProps {
	showEmployeesList: () => void
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

export const AddEmployeePage = ({ showEmployeesList }: AddEmpProps) => {
	const classes = useStyles()

	const dispatch = useDispatch()

	const {
		first_name,
		last_name,
		phone,
		email,
		address,
		city,
		st,
		zip,
		isLoading,
		error
	} = useSelector((state: RootState) => state.employeeToAdd)

	const setEmployee = (
		first_name: string,
		last_name: string,
		phone: string,
		email: string,
		address: string,
		city: string,
		st: string,
		zip: string
	) => {
		dispatch(
			setEmployeeToAdd({
				first_name,
				last_name,
				phone,
				email,
				address,
				city,
				st,
				zip
			})
		)
	}

	if (error) {
		return (
			<div className={classes.root}>
				<Alert severity="error">
					Something went wrong - {error.toString()}
				</Alert>
				<AddEmployeeForm
					showEmployeesList={showEmployeesList}
					first_name={first_name}
					last_name={last_name}
					phone={phone}
					email={email}
					address={address}
					city={city}
					st={st}
					zip={zip}
					setEmployee={setEmployee}
				/>
			</div>
		)
	}

	let renderedPage = isLoading ? (
		<h1 className="saving">Saving...</h1>
	) : (
		<div>
			<AddEmployeeForm
				first_name={first_name}
				last_name={last_name}
				phone={phone}
				email={email}
				address={address}
				city={city}
				st={st}
				zip={zip}
				setEmployee={setEmployee}
				showEmployeesList={showEmployeesList}
			/>
		</div>
	)

	return <div>{renderedPage}</div>
}
