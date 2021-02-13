import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AddEmployeeForm } from './AddEmployeeForm'
import { setEmployeeToAdd } from './addEmployeeSlice'
import { RootState } from '../../app/rootReducer'


interface AddEmpProps {
    showEmployeesList: () => void
}

export const AddEmployeePage = ({
    showEmployeesList
}: AddEmpProps) => {
    const dispatch = useDispatch()

    const { first_name, last_name, phone, email, address, city, 
            st, zip, isLoading, error } = useSelector(
                (state: RootState) => state.employeeToAdd)

    const setEmployee = (first_name: string, last_name: string,
                         phone: string, email: string, address: string,
                         city: string, st: string, zip: string) => {
    dispatch(setEmployeeToAdd({ first_name, last_name, phone, email, 
                                    address, city, st, zip }))
    }

    const backToEmployeesListButton = (
        <button onClick={showEmployeesList}>
            Back To Employees
        </button>
    )

    if (error) {
        return (
            <div>
                <div>
                    {backToEmployeesListButton}
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
                    />
                </div>
                <h1>Something went wrong...</h1>
                <div>{error.toString()}</div>
            </div>
        )
    }

    let renderedPage = isLoading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            {backToEmployeesListButton}
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
            />
        </div>
    )

    return <div>{renderedPage}</div>
} 