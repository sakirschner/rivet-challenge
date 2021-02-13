import React, { useState, ChangeEvent } from 'react'


interface Props {
    first_name: string
    last_name: string
    phone: string
    email: string
    address: string
    city: string
    st: string
    zip: string
    setEmployee: (first_name: string, last_name: string,
                   phone: string, email: string, address: string,
                   city: string, st: string, zip: string) => void
}

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const AddEmployeeForm = ({ first_name, last_name, phone,
                                  email, address, city, st, zip,
                                  setEmployee} : Props) => {
    const [curFirstName, setFirstName] = useState(first_name)
    const [curLastName, setLastName] = useState(last_name)
    const [curPhone, setPhone] = useState(phone)
    const [curEmail, setEmail] = useState(email)
    const [curAddress, setAddress] = useState(address)
    const [curCity, setCity] = useState(city)
    const [curSt, setSt] = useState(st)
    const [curZip, setZip] = useState(zip)

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

    const onSaveClicked = () => {
        setEmployee(curFirstName, curLastName, curPhone, curEmail,
                    curAddress, curCity, curSt, curZip)
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
                <button type="button" onClick={onSaveClicked}>
                    Add Employee
                </button>
            </div>
        </form>
    )

}