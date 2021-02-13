import React from 'react'
import classnames from 'classnames'

import { Employee } from '../../api/employeeAPI'

interface EmployeeProps {
    employee: Employee
}

export const EmployeeMeta = ({ employee }: EmployeeProps ) => {
    return (
        <div>
            <h1>{employee.first_name} {employee.last_name}</h1>
            <h2>{employee.email}</h2>
        </div>
    )
}