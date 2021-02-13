import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { EmployeesList } from './EmployeesList'
import { fetchEmployees } from './employeesSlice'

interface EmpListProps {
    showEmployeeDetails: (employeeId: number) => void
}

export const EmployeesListPage = ({ showEmployeeDetails }: EmpListProps) => {
    const dispatch = useDispatch()

    const {
        currentEmployees,
        isLoading,
        error: employeesError,
        employeesById,
    } = useSelector((state: RootState) => state.employees)

    const employees = currentEmployees.map(
        employee => employeesById[employee]
    )

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
        <h3>Loading...</h3>
    ) : (
        <EmployeesList 
            employees={employees}
            showEmployeeDetails={showEmployeeDetails}
        />
    )

    return (
        <div>
            {renderedList}
        </div>
    )
}