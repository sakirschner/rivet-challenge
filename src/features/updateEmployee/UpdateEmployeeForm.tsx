import React, { useState, ChangeEvent } from 'react'

import { useDispatch } from 'react-redux'
import { Employee } from '../../api/employeeAPI'

import { putEmployee } from './updateEmployeeSlice'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import './UpdateEmployeeForm.css'

interface Props {
   employee: Employee
   showEmployeeDetails: (emploeeId: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }),
);

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const UpdateEmployeeForm = ({ 
    employee,
    showEmployeeDetails
} : Props) => {
    const [curFirstName, setFirstName] = useState(employee.first_name)
    const [curLastName, setLastName] = useState(employee.last_name)
    const [curPhone, setPhone] = useState(employee.phone)
    const [curEmail, setEmail] = useState(employee.email)
    const [curAddress, setAddress] = useState(employee.address)
    const [curCity, setCity] = useState(employee.city)
    const [curSt, setSt] = useState(employee.state)
    const [curZip, setZip] = useState(employee.zip)
    const [curNotes, setNotes] = useState(employee.notes)

    const classes = useStyles();

    const dispatch = useDispatch()

    const onFirstNameChanged: ChangeHandler = e => {
        setFirstName(e.target.value)
    }

    const onLastNameChanged: ChangeHandler = e => {
        setLastName(e.target.value)
    }

    const onPhoneChanged: ChangeHandler = e => {
        setPhone(e.target.value)
    }

    const onEmailChanged: ChangeHandler = e => {
        setEmail(e.target.value)
    }

    const onAddressChanged: ChangeHandler = e => {
        setAddress(e.target.value)
    }

    const onCityChanged: ChangeHandler = e => {
        setCity(e.target.value)
    }

    const onStChanged: ChangeHandler = e => {
        setSt(e.target.value)
    }

    const onZipChanged: ChangeHandler = e => {
        setZip(e.target.value)
    }

    const onNotesChanged: ChangeHandler = e => {
        setNotes(e.target.value)
    }

    const onSaveClicked = () => {
        dispatch(putEmployee(employee.id, curFirstName, curLastName, curPhone, curEmail,
            curAddress, curCity, curSt, curZip, curNotes))
    }

    return (
        <form className={classes.root} autoComplete='off'>
            <div className='form'>
                <TextField variant="outlined" className='field' label='First Name' name="first_name" value={curFirstName} onChange={onFirstNameChanged} />
                <TextField variant="outlined" className='field' label='Last Name' name="last_name" value={curLastName} onChange={onLastNameChanged} />
                <TextField variant="outlined" className='field' label='Phone' name="phone" value={curPhone} onChange={onPhoneChanged} />
                <TextField variant="outlined" className='field' label='Email' name="email" value={curEmail} onChange={onEmailChanged} />
                <TextField variant="outlined" className='field' label='Address' name="address" value={curAddress} onChange={onAddressChanged} />
                <TextField variant="outlined" className='field' label='City' name="city" value={curCity} onChange={onCityChanged} />
                <TextField variant="outlined" className='field' label='State' name="st" value={curSt} onChange={onStChanged} />
                <TextField variant="outlined" className='field' label='Zip' name="zip" value={curZip} onChange={onZipChanged} />
                <TextField variant="outlined" className='field' multiline label='Notes' name="notes" value={curNotes} onChange={onNotesChanged} />
                <button type="button" onClick={onSaveClicked}>
                    Save
                </button>
                <button onClick={() => (showEmployeeDetails(employee.id))}>
                    Cancel
                </button>
            </div>
        </form>
    )

}