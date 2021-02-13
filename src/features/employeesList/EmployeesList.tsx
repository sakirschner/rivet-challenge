import React from 'react'

import { Employee } from '../../api/employeeAPI'
import { AddEmployeeButton } from '../../components/AddEmployeeButton'

import { EmployeeListItem } from './EmployeeListItem'

interface Props {
    employees: Employee[]
    showEmployeeDetails: (employeeId: number) => void
    showAddEmployee: () => void
}

export const EmployeesList = ({ 
    employees, 
    showEmployeeDetails,
    showAddEmployee
 }: Props) => {
    let content
    
    const renderedEmployees = employees.map(employee => (
        <li key={employee.id}>
            <EmployeeListItem 
                {...employee} 
                showEmployeeDetails={showEmployeeDetails}
            />
        </li>
    ))

    content = (
        <div>
            <AddEmployeeButton 
                showAddEmployee={showAddEmployee} 
            />
            <ul>{renderedEmployees}</ul>
        </div>
    )

    return <ul>{content}</ul>
}

