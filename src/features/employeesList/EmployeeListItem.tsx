import React from 'react'

import { Employee } from '../../api/employeeAPI'

type Props = Employee

export const EmployeeListItem = ({ 
    first_name,
    last_name,
    email 
}: Props) => {
    
    return (
        <div>
            <h2>{first_name} {last_name}</h2>
            <p>{email}</p>
        </div>
    )
}

