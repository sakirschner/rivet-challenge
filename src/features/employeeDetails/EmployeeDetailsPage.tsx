import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchEmployee } from '../../features/employeesList/employeesSlice'

import { EmployeeMeta } from './EmployeeMeta'

interface EmpDetailsProps {
    employeeId: number
    showEmployeesList: () => void
}

export const EmployeeDetailsPage = ({
    employeeId,
    showEmployeesList
}: EmpDetailsProps) => {
    const dispatch = useDispatch()

    const employee = useSelector(
        (state: RootState) => state.employees.employeesById[employeeId]
    )

    useEffect(() => {
        if (!employee) {
            dispatch(fetchEmployee(employeeId))
        }

        //in case employee is alreay loaded
        window.scrollTo({ top: 0 })
    }, [employeeId, employee, dispatch])

    let content

    const backToEmployeesListButton = (
        <button onClick={showEmployeesList}>
            Back To Employees
        </button>
    )

    if (employee === null) {
        content = (
            <div>
                {backToEmployeesListButton}
                <p>Something went wrong loading Employee ID {employeeId}...</p>
            </div>
        )
    } else {
        content = (
            <div>
                {backToEmployeesListButton}
                <EmployeeMeta employee={employee} />
            </div>
        )
    }

    return <div>{content}</div>
}