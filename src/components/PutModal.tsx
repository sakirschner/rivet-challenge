import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../app/rootReducer'
import { setModalClose } from '../features/updateEmployee/updateEmployeeSlice'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { Employee } from '../api/employeeAPI'

interface ModalProps {
    employee: Employee
    showEmployeeDetails: (employeeId: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		}
	})
)

function getModalStyle() {
	const top = 30
	const left = 45

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	}
}

export const PutModal = ({ showEmployeeDetails, employee }: ModalProps) => {
	const classes = useStyles()
	const [modalStyle] = React.useState(getModalStyle)

	const dispatch = useDispatch()

	const open = useSelector((state: RootState) => state.empolyeeToPut.modalOpen)

	const handleClose = () => {
        dispatch(setModalClose())
        showEmployeeDetails(employee.id)
	}

	const content = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="simple-modal-title">Employee Saved!</h2>
			<Button variant="contained" color="primary" onClick={handleClose}>
				Ok
			</Button>
		</div>
	)

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				{content}
			</Modal>
		</div>
	)
}

export default PutModal
