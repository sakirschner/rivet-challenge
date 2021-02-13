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
            st, zip } = useSelector(
                (state: RootState) => state.employeeToAdd
    )

    const setEmployee = (first_name: string, last_name: string,
                         phone: string, email: string, address: string,
                         city: string, st: string, zip: string) => {
        dispatch(setEmployeeToAdd({ first_name, last_name, phone, email, 
                                    address, city, st, zip }))
    }

    let content

    const backToEmployeesListButton = (
        <button onClick={showEmployeesList}>
            Back To Employees
        </button>
    )

    content = (
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

    return <div>{content}</div>
} 