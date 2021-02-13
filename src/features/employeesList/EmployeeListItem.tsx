import React, { MouseEvent } from 'react'

import { Employee } from '../../api/employeeAPI'

type Props = Employee & {
    showEmployeeDetails: (employeeId: number) => void
}

export const EmployeeListItem = ({
    id, 
    first_name,
    last_name,
    email,
    showEmployeeDetails 
}: Props) => {
    const onEmployeeClicked = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        showEmployeeDetails(id)
    }
    return (
        <div>
            <a href="#details" onClick={onEmployeeClicked}>
                <h2>{first_name} {last_name}</h2>
            </a>
            <p>{email}</p>
        </div>
    )
}

