import React, { MouseEvent } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { RootState } from './rootReducer'

import { EmployeesListPage } from '../features/employeesList/EmployeesListPage'
import { EmployeeDetailsPage } from '../features/employeeDetails/EmployeeDetailsPage'
import { AddEmployeePage } from '../features/addEmployee/AddEmployeePage'
import { AddEmployeeButton } from '../components/AddEmployeeButton'
import { SaveModal } from '../components/SaveModal'

import { setCurrentDisplayType } from '../features/employeesDisplay/employeesDisplaySplice'
import { UpdateEmployeePage } from '../features/updateEmployee/UpdateEmployeePage'
import { resetEmployeeToAddState } from '../features/addEmployee/addEmployeeSlice'
import { resetEmployeeToPutState } from '../features/updateEmployee/updateEmployeeSlice'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'

import logo from '../images/Rivet_Logo_White.png'

import './App.css'

type CurrentDisplay =
	| {
			type: 'employees'
	  }
	| {
			type: 'employeeDetails'
			employeeId: number
	  }
	| {
			type: 'addEmployee'
	  }
	| {
			type: 'updateEmployee'
			employeeId: number
	  }

interface Props {
	children: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2)
		}
	})
)

function ScrollTop(props: Props) {
	const classes = useStyles()
	const { children } = props
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 75
	})

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor')

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.root}>
				{children}
			</div>
		</Zoom>
	)
}

const App: React.FC<Props> = (props: Props) => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const { displayType, employeeId } = useSelector(
		(state: RootState) => state.employeesDisplay
	)

	const showEmployeesList = () => {
		dispatch(setCurrentDisplayType({ displayType: 'employees' }))
		dispatch(resetEmployeeToAddState())
	}

	const showEmployeeDetails = (employeeId: number) => {
		dispatch(setCurrentDisplayType({ displayType: 'details', employeeId }))
		dispatch(resetEmployeeToPutState())
	}

	const showUpdateEmployee = (employeeId: number) => {
		dispatch(
			setCurrentDisplayType({ displayType: 'updateEmployee', employeeId })
		)
	}

	const showAddEmployee = () => {
		dispatch(setCurrentDisplayType({ displayType: 'addEmployee' }))
	}

	const onLogoClicked = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		showEmployeesList()
	}

	let content

	if (displayType === 'employees') {
		content = (
			<EmployeesListPage
				showEmployeeDetails={showEmployeeDetails}
				showAddEmployee={showAddEmployee}
			/>
		)
	} else if (displayType === 'addEmployee') {
		content = <AddEmployeePage showEmployeesList={showEmployeesList} />
	} else if (employeeId !== null) {
		const key = `${employeeId}`
		if (displayType === 'details') {
			content = (
				<EmployeeDetailsPage
					key={key}
					employeeId={employeeId}
					showEmployeesList={showEmployeesList}
					showUpdateEmployee={showUpdateEmployee}
				/>
			)
		} else if (displayType === 'updateEmployee') {
			content = (
				<UpdateEmployeePage
					key={key}
					employeeId={employeeId}
					showEmployeeDetails={showEmployeeDetails}
				/>
			)
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar className="appBar">
				<Toolbar>
					<a href="#list" onClick={onLogoClicked}>
						<img src={logo} className="logo" />
					</a>
					<div className="addButton">
						<AddEmployeeButton showAddEmployee={showAddEmployee} />
					</div>
				</Toolbar>
			</AppBar>
			<Container>
				<Toolbar id="back-to-top-anchor" />
				<Box className="formContainer">
					<SaveModal />
					{content}
				</Box>
			</Container>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	)
}

export default App
