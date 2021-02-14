import React from 'react'

import { Employee } from '../../api/employeeAPI'
import { AddEmployeeButton } from '../../components/AddEmployeeButton'

import { EmployeeListItem } from './EmployeeListItem'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

interface Props {
    employees: Employee[]
    showEmployeeDetails: (employeeId: number) => void
    showAddEmployee: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export const EmployeesList = ({ 
    employees, 
    showEmployeeDetails,
    showAddEmployee
 }: Props) => {
    const classes = useStyles()

    let content
    
    const renderedEmployees = employees.map(employee => (
        <>
            <ListItem alignItems="flex-start" key={employee.id}>
                <EmployeeListItem 
                    {...employee} 
                    showEmployeeDetails={showEmployeeDetails}
                />
            </ListItem>
            <Divider variant="inset" />
        </>
    ))

    content = (
        <div>
            <AddEmployeeButton 
                showAddEmployee={showAddEmployee} 
            />
            <ul>{renderedEmployees}</ul>
        </div>
    )

    return <List className={classes.root}>{content}</List>
}

