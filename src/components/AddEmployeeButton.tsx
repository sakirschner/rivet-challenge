import React from 'react'

interface AddEmpButtonProps {
    showAddEmployee: () => void
}

export const AddEmployeeButton = ({
    showAddEmployee
}: AddEmpButtonProps) => {

    const addEmployeeButton = (
        <button onClick={showAddEmployee}>
            Add Employee
        </button>
    )

    return <div>{addEmployeeButton}</div>
}