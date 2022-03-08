import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Item, Button } from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import service from '../../api/service';

export default function TripCard(props) {
	const [city, setCity] = useState(undefined)
	const [country, setCountry] = useState(undefined)
	const [startDate, setStartDate] = useState(undefined);
	const [endDate, setEndDate] = useState(undefined);
	const [numberOfPeople, setNumberOfPeople] = useState(undefined);
	const [content, setContent] = useState(undefined);
	const [duration, setDuration] = useState(undefined);

	useEffect(() => {
		service.get(`/trips`)
			.then(response => {
				// console.log(response)
				setCity(response.data[0].city)
				setCountry(response.data[0].country)
				setStartDate(() => {
					let date = new Date(response.data[0].startDate).toDateString()
					// console.log(date)
					return date
				})
				setEndDate(() => {
					let date = new Date(response.data[0].endDate).toDateString()
					// console.log(date)
					return date
				})
				setDuration(() => {
					// let checkIn = new Date(response.data[0].startDate)
					// let checkout = new Date(response.data[0].endDate)
					// let date = checkout-checkIn
					// console.log(date.toDateString())
					// return date
				})
				setNumberOfPeople(response.data[0].numberOfPeople)
				setContent(response.data[0].setContent)
			}
			)
			.catch(err => console.log(err))
	}, [])


	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<Typography variant="h6" >
						PUBLIC TRIPS
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<AutoAwesomeOutlinedIcon />}>
						OFFER TO HOST
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<PushPinOutlinedIcon sx={{ mr: 1 }} />
						</Grid>
						<Grid item>
							{city}, {country}
						</Grid>
					</Grid>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<PeopleAltOutlinedIcon sx={{ mr: 1 }} />
						</Grid>
						<Grid item>
							{numberOfPeople} Travellers
						</Grid>
					</Grid>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<AccessTimeOutlinedIcon sx={{ mr: 1 }} />
						</Grid>
						<Grid item>
							duration
						</Grid>
					</Grid>
					<Grid container direction="row" alignItems="center">
						<Grid item>
							<EventOutlinedIcon sx={{ mr: 1 }} />
						</Grid>
						<Grid item>
							{startDate} - {endDate}
						</Grid>
					</Grid>
					<Typography variant="body1" gutterBottom>
						{content}
					</Typography>
				</Grid>
				<Grid item xs={12} >
					<Link>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<EditOutlinedIcon />}>
							Edit
						</Button>
					</Link>
					<Link>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<DeleteOutlinedIcon />}>
							Remove
						</Button>
					</Link>
				</Grid>
			</Grid>
		</>
	);
}
