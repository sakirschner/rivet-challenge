import React from 'react'

interface AddEmpProps {
    showEmployeesList: () => void
}

export const AddEmployeePage = ({
    showEmployeesList
}: AddEmpProps) => {

    let content

    const backToEmployeesListButton = (
        <button onClick={showEmployeesList}>
            Back To Employees
        </button>
    )

    content = (
        <div>
            {backToEmployeesListButton}
            <h1>Hello!!!</h1>
        </div>
    )

    return <div>{content}</div>
} 