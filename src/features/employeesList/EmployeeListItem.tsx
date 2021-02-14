import React, { MouseEvent } from 'react'

import { Employee } from '../../api/employeeAPI'

import styles from './EmployeeListItem.module.css'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { deepPurple } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

type Props = Employee & {
	showEmployeeDetails: (employeeId: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		purple: {
			color: theme.palette.getContrastText(deepPurple[500]),
			backgroundColor: deepPurple[500]
		},
		inline: {
			display: 'inline'
		}
	})
)

export const EmployeeListItem = ({
	id,
	first_name,
	last_name,
	phone,
	email,
	photo,
	showEmployeeDetails
}: Props) => {
	const classes = useStyles()

	const onEmployeeClicked = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		showEmployeeDetails(id)
	}

	let renderedAvatar = photo ? (
		<ListItemAvatar>
			<Avatar src={photo} />
		</ListItemAvatar>
	) : (
		<ListItemAvatar>
			<Avatar className={classes.purple}>
				{first_name.substring(0, 1).toUpperCase()}
				{last_name.substring(0, 1).toUpperCase()}
			</Avatar>
		</ListItemAvatar>
	)

	let content

	content = (
		<>
			{renderedAvatar}
			<a href="#details" onClick={onEmployeeClicked}>
				<ListItemText
					primary={
						first_name.substring(0, 1).toUpperCase() +
						first_name.substring(1).toLocaleLowerCase() +
						' ' +
						last_name.substring(0, 1).toUpperCase() +
						last_name.substring(1).toLocaleLowerCase()
					}
					secondary={
						<>
							<Typography
								component="span"
								variant="body2"
								className={classes.inline}
								color="textPrimary">
								{email}
							</Typography>
							<Button
								className={styles.detailsButton}
								color="primary"
								onClick={onEmployeeClicked}>
								View Details
							</Button>
						</>
					}
				/>
			</a>
		</>
	)

	return <>{content}</>
}
