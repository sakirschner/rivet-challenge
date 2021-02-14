import React, { useState, ChangeEvent, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { postEmployee } from './addEmployeeSlice'

import '../updateEmployee/UpdateEmployeeForm.css'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface Props {
	first_name: string
	last_name: string
	phone: string
	email: string
	address: string
	city: string
	st: string
	zip: string
	setEmployee: (
		first_name: string,
		last_name: string,
		phone: string,
		email: string,
		address: string,
		city: string,
		st: string,
		zip: string
	) => void
	showEmployeesList: () => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '100%'
			}
		}
	})
)

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const AddEmployeeForm = ({
	first_name,
	last_name,
	phone,
	email,
	address,
	city,
	st,
	zip,
	setEmployee,
	showEmployeesList
}: Props) => {
	const [curFirstName, setFirstName] = useState(first_name)
	const [curLastName, setLastName] = useState(last_name)
	const [curPhone, setPhone] = useState(phone)
	const [curEmail, setEmail] = useState(email)
	const [curAddress, setAddress] = useState(address)
	const [curCity, setCity] = useState(city)
	const [curSt, setSt] = useState(st)
	const [curZip, setZip] = useState(zip)

	useEffect(() => {
		if (error === null && submitted) {
			setFirstName('')
			setLastName('')
			setPhone('')
			setEmail('')
			setAddress('')
			setCity('')
			setSt('')
			setZip('')
		}
	})

	const classes = useStyles()

	const dispatch = useDispatch()

	const error = useSelector((state: RootState) => state.employeeToAdd.error)

	const submitted = useSelector(
		(state: RootState) => state.employeeToAdd.submitted
	)

	const onFirstNameChanged: ChangeHandler = (e) => {
		setFirstName(e.target.value)
	}

	const onLastNameChanged: ChangeHandler = (e) => {
		setLastName(e.target.value)
	}

	const onPhoneChanged: ChangeHandler = (e) => {
		setPhone(e.target.value)
	}

	const onEmailChanged: ChangeHandler = (e) => {
		setEmail(e.target.value)
	}

	const onAddressChanged: ChangeHandler = (e) => {
		setAddress(e.target.value)
	}

	const onCityChanged: ChangeHandler = (e) => {
		setCity(e.target.value)
	}

	const onStChanged: ChangeHandler = (e) => {
		setSt(e.target.value)
	}

	const onZipChanged: ChangeHandler = (e) => {
		setZip(e.target.value)
	}

	const onSaveClicked = () => {
		setEmployee(
			curFirstName,
			curLastName,
			curPhone,
			curEmail,
			curAddress,
			curCity,
			curSt,
			curZip
		)
		dispatch(
			postEmployee(
				curFirstName,
				curLastName,
				curPhone,
				curEmail,
				curAddress,
				curCity,
				curSt,
				curZip
			)
		)
	}

	return (
		<form className={classes.root} autoComplete="off">
			<div className="form">
				<div className="names">
					<TextField
						variant="outlined"
						label="First Name"
						name="first_name"
						className="firstName"
						value={curFirstName}
						onChange={onFirstNameChanged}
					/>
					<TextField
						variant="outlined"
						label="Last Name"
						name="last_name"
						value={curLastName}
						onChange={onLastNameChanged}
					/>
				</div>

				<TextField
					variant="outlined"
					className="field"
					label="Phone"
					name="phone"
					value={curPhone}
					onChange={onPhoneChanged}
				/>
				<TextField
					variant="outlined"
					className="field"
					label="Email"
					name="email"
					value={curEmail}
					onChange={onEmailChanged}
				/>
				<TextField
					variant="outlined"
					className="field"
					label="Address"
					name="address"
					value={curAddress}
					onChange={onAddressChanged}
				/>
				<TextField
					variant="outlined"
					className="field"
					label="City"
					name="city"
					value={curCity}
					onChange={onCityChanged}
				/>
				<TextField
					variant="outlined"
					className="field"
					label="State"
					name="st"
					value={curSt}
					onChange={onStChanged}
				/>
				<TextField
					variant="outlined"
					className="field"
					label="Zip"
					name="zip"
					value={curZip}
					onChange={onZipChanged}
				/>
				<div className="buttonContainer">
					<Button
						variant="contained"
						color="secondary"
						type="button"
						onClick={showEmployeesList}>
						Back To Employees
					</Button>
					<Button
						variant="contained"
						color="primary"
						type="button"
						onClick={onSaveClicked}>
						Save
					</Button>
				</div>
			</div>
		</form>
	)
}
