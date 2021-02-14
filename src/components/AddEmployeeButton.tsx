import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface AddEmpButtonProps {
    showAddEmployee: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


export const AddEmployeeButton = ({
    showAddEmployee
}: AddEmpButtonProps) => {
    const classes = useStyles();

    const addEmployeeButton = (
        <Button variant="contained" color="primary" onClick={showAddEmployee}>
            Add Employee
        </Button>
    )

    return <div className={classes.root}>{addEmployeeButton}</div>
}