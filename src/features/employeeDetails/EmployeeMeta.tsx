import React from 'react'

import { Employee } from '../../api/employeeAPI'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

import './EmployeeMeta.css'

import Button from '@material-ui/core/Button';


interface EmployeeProps {
    showEmployeesList: () => void
    showUpdateEmployee: (employeeId: number) => void
    employee: Employee
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  }),
);

export const EmployeeMeta = ({ 
    employee,
    showEmployeesList,
    showUpdateEmployee
}: EmployeeProps ) => {
    const classes = useStyles();

    const backToEmployeesListButton = (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={showEmployeesList}
            className='button'
        >
            Back To Employees
        </Button>
    )

    const updateEmployeeButton = (
        <Button 
            variant="contained" 
            color="default" 
            onClick={() => showUpdateEmployee(employee.id)}
            className='button'
        >
            Edit Employee
        </Button>
    )

    let renderedAvatar = employee.photo ? (
            <Avatar src={employee.photo} className={classes.large} />
    ) : ( 
            <Avatar className={classes.purple} >
                <h1>
                    {employee.first_name.substring(0,1).toUpperCase()}
                    {employee.last_name.substring(0,1).toUpperCase()}
                </h1>
            </Avatar>
    )
    
    return (
        <>
            <div className='infoContainer'>
                <Box display="flex" p={1} bgcolor="background.paper">
                    <Container style={{ width: '50%', margin: ' 10px 30px 0 0' }}>
                        {renderedAvatar}
                    </Container>
                    <Container>
                        <h1>{employee.first_name} {employee.last_name}</h1>
                        <div className='info'>
                            <p><b>Email:</b></p> 
                            <h3>{employee.email}</h3>
                        </div>
                        <div className='info'>
                            <p><b>Phone:</b></p> 
                            <h3>{employee.phone}</h3>
                        </div>
                        <div className='info'>
                            <p><b>Address:</b></p> 
                            <h3>{employee.address}</h3>
                        </div>
                        <div className='info'>
                            <p><b>City:</b></p> 
                            <h3>{employee.city}</h3>
                        </div>
                        <div className='info'>
                            <p><b>State:</b></p> 
                            <h3>{employee.state}</h3>
                        </div>
                        <div className='info'>
                            <p><b>Zip:</b></p> 
                            <h3>{employee.zip}</h3>
                        </div>
                        <div className='info'>
                            <p><b>Notes:</b></p> 
                            <h3>{employee.notes}</h3>
                        </div>
                    </Container>
                </Box>

            </div>
            <div className='buttons'>
                {backToEmployeesListButton}
                {updateEmployeeButton}
            </div>
        </>
    )
}