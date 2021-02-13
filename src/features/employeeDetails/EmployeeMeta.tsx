import React from 'react'

import { Employee } from '../../api/employeeAPI'
import { useDispatch } from 'react-redux'

interface EmployeeProps {
    employee: Employee
}

export const EmployeeMeta = ({ 
    employee,
}: EmployeeProps ) => {
    
    return (
        <div>
            <h1>{employee.first_name} {employee.last_name}</h1>
            <h2>{employee.email}</h2>
        </div>
    )
}