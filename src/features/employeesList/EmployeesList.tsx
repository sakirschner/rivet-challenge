import React from 'react'

import { Employee } from '../../api/employeeAPI'
import { EmployeeListItem } from './EmployeeListItem'

interface Props {
    employees: Employee[]
    showEmployeeDetails: (employeeId: number) => void
}

export const EmployeesList = ({ employees, showEmployeeDetails }: Props) => {
    const renderedEmployees = employees.map(employee => (
        <li key={employee.id}>
            <EmployeeListItem 
                {...employee} 
                showEmployeeDetails={showEmployeeDetails}
            />
        </li>
    ))

    return <ul>{renderedEmployees}</ul>
}

