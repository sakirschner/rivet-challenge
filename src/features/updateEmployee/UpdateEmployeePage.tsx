import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'
import { fetchEmployee } from '../../features/employeesList/employeesSlice'

interface UpEmpProps {
    employeeId: number
}

export const UpdateEmployeePage = ({ employeeId }: UpEmpProps) => {
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

    return <div>Hi! { employee.first_name }</div>
}
