import React from 'react'

import { Employee } from '../../api/employeeAPI'
import { EmployeeListItem } from './EmployeeListItem'

interface Props {
    employees: Employee[]
}

export const EmployeesList = ({ employees }: Props) => {
    const renderedEmployees = employees.map(employee => (
        <li key={employee.id}>
            <EmployeeListItem {...employee} />
        </li>
    ))

    return <ul>{renderedEmployees}</ul>
}

