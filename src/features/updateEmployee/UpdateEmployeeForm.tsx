import React, { useState, ChangeEvent } from 'react'

import { useDispatch } from 'react-redux'
import { Employee } from '../../api/employeeAPI'

import { putEmployee } from './updateEmployeeSlice'


interface Props {
   employee: Employee
}

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const UpdateEmployeeForm = ({ employee} : Props) => {
    const [curFirstName, setFirstName] = useState(employee.first_name)
    const [curLastName, setLastName] = useState(employee.last_name)
    const [curPhone, setPhone] = useState(employee.phone)
    const [curEmail, setEmail] = useState(employee.email)
    const [curAddress, setAddress] = useState(employee.address)
    const [curCity, setCity] = useState(employee.city)
    const [curSt, setSt] = useState(employee.state)
    const [curZip, setZip] = useState(employee.zip)
    const [curNotes, setNotes] = useState(employee.notes)

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
        <form>
            <div>
                <label htmlFor="first_name">
                    First Name:
                </label>
                <input name="first_name" value={curFirstName} onChange={onFirstNameChanged} />
                <label htmlFor="last_name">
                    Last Name:
                </label>
                <input name="last_name" value={curLastName} onChange={onLastNameChanged} />
                <label htmlFor="phone">
                    Phone:
                </label>
                <input name="phone" value={curPhone} onChange={onPhoneChanged} />
                <label htmlFor="email">
                    Email:
                </label>
                <input name="email" value={curEmail} onChange={onEmailChanged} />
                <label htmlFor="address">
                    Address:
                </label>
                <input name="address" value={curAddress} onChange={onAddressChanged} />
                <label htmlFor="city">
                    City:
                </label>
                <input name="city" value={curCity} onChange={onCityChanged} />
                <label htmlFor="st">
                    State:
                </label>
                <input name="st" value={curSt} onChange={onStChanged} />
                <label htmlFor="zip">
                    Zip:
                </label>
                <input name="zip" value={curZip} onChange={onZipChanged} />
                <label htmlFor="notes">
                    Notes:
                </label>
                <input name="notes" value={curNotes} onChange={onNotesChanged} />
                <button type="button" onClick={onSaveClicked}>
                    Add Employee
                </button>
            </div>
        </form>
    )

}