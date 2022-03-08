import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LuggageIcon from "@mui/icons-material/Luggage";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, Grid, IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import service from "../../api/service";

export default function TripCard(props) {
    const [trips, setTrips] = useState([]);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const deleteTrip = (idx, tripId) => {
        service
            .delete(`/trips/${tripId}`)
            .then(() => {
                trips.splice(idx, 1);

                setTrips(trips);
                forceUpdate();
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        service
            .get(`/profile/${props.userId}/trips`)
            .then(({ data: trips }) => {
                setTrips(trips);
                // setCity(response.data[0].city)
                // setCountry(response.data[0].country)
                // setStartDate(() => {
                // 	let date = new Date(response.data[0].startDate).toDateString()
                // 	// console.log(date)
                // 	return date
                // })
                // setEndDate(() => {
                // 	let date = new Date(response.data[0].endDate).toDateString()
                // 	// console.log(date)
                // 	return date
                // })
                // // setDuration(() => {
                // // let checkIn = new Date(response.data[0].startDate)
                // // let checkout = new Date(response.data[0].endDate)
                // // let date = checkout-checkIn
                // // console.log(date.toDateString())
                // // return date
                // // })
                // setNumberOfPeople(response.data[0].numberOfPeople)
                // setContent(response.data[0].setContent)
            })
            .catch((err) => console.log(err));
    }, [props.userId]);

    if (trips.length === 0 && props.userId !== "me") {
        return <></>;
    }

    // if (!trip) {
    //     if (props.userId === "me") {
    //         return (
    //             <>
    //                 <Container maxWidth="lg">
    //                     <Grid item xs={12} >
    //                         <Button href="/profile/me/couch/edit" variant="contained" sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
    //                             Are you planning a trip?
    //                         </Button>
    // <Typography align="justify" color="text.secondary">
    // 	Let make your trip great with a new adventure, have a thousand of memory, meet new friends, and stay with local hosts.
    // </Typography>
    //                     </Grid>
    //                 </Container>
    //             </>
    //         )
    //     }

    //     // Case of other people profile goes here.
    // }

    return (
        <>
            <Container maxWidth='md' disableGutters>
                <br />
                {/* https://codesandbox.io/s/lioc4z?file=/demo.js:924-1359 */}
                <Accordion expanded>
                    <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                        <Grid container direction='row' alignItems='center'>
                            <LuggageIcon sx={{ mr: 1 }} />
                            <Typography variant='h6' align='justify'>
                                My Travel Plan
                            </Typography>
                        </Grid>
                        {props.userId === "me" && (
                            <Button href='/profile/me/trips/new' endIcon={<AddCircleOutline />}>
                                Add
                            </Button>
                        )}
                    </AccordionSummary>
                    <AccordionDetails>
                        {trips.length === 0 ? (
                            <Grid container direction='row'>
                                <Divider textAlign='left'></Divider>
                                <br />
                                <Typography align='justify' color='text.secondary' sx={{ fontStyle: "italic" }}>
                                    <FormatQuoteIcon />
                                    Let make your trip great with a new adventure, have a thousand of memory, meet new friends, and stay with local hosts.
                                </Typography>
                            </Grid>
                        ) : (
                            trips.map((trip, idx) => (
                                <>
                                    <Divider textAlign='left'></Divider>
                                    <Container maxWidth='md' disableGutters sx={{ mt: 3, mb: 3 }}>
                                        <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                            <Grid direction='row' xs={10}>
                                                <Typography align='justify' color='text.secondary'>
                                                    <span>Visiting:</span>&nbsp;
                                                    <strong>
                                                        {trip.city}, {trip.country}
                                                    </strong>
                                                </Typography>
                                            </Grid>
                                            <Grid direction='row' xs={2} sx={{ textAlign: "right" }}>
                                                <Link href={`/profile/me/trips/${trip.id}/edit`}>
                                                    <IconButton size='small' aria-label='edit' component='span'>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton onClick={() => deleteTrip(idx, trip.id)} size='small' aria-label='edit' component='span'>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                            <PeopleAltOutlinedIcon sx={{ mr: 1 }} color='disabled' />
                                            <Typography align='justify' color='text.secondary'>
                                                {trip.numberOfPeople} Travellers
                                            </Typography>
                                        </Grid>
                                        <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                            <EventOutlinedIcon sx={{ mr: 1 }} color='disabled' />
                                            <Typography align='justify' color='text.secondary'>
                                                {moment(trip.startDate).format("DD-MM-YYYY")}
                                            </Typography>
                                            <ArrowForwardIcon />
                                            <Typography align='justify' color='text.secondary'>
                                                {moment(trip.endDate).format("DD-MM-YYYY")}
                                            </Typography>
                                        </Grid>
                                        <Typography align='justify' color='text.secondary' paragraph>
                                            {trip.content}
                                        </Typography>
                                    </Container>
                                </>
                            ))
                        )}
                        {/* <Grid container direction="row" alignItems="center">
                            <PushPinOutlinedIcon sx={{ mr: 1 }} />
                            <Typography align="justify" color="text.secondary">
                                {city}, {country}
                            </Typography>
                        </Grid>
                        <Grid container direction="row" alignItems="center">
                            <PeopleAltOutlinedIcon sx={{ mr: 1 }} />
                            <Typography align="justify" color="text.secondary">
                                {numberOfPeople} Travellers
                            </Typography>
                        </Grid>
                        <Grid container direction="row" alignItems="center">
                            <EventOutlinedIcon sx={{ mr: 1 }} />
                            <Typography align="justify" color="text.secondary">
                                {startDate} - {endDate}
                            </Typography>
                        </Grid>
                        <Typography align="justify" color="text.secondary" paragraph>
                            {content}
                        </Typography> */}
                    </AccordionDetails>
                </Accordion>
            </Container>
            {/*
            <Grid item xs={4}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<AutoAwesomeOutlinedIcon />}>
                    OFFER TO HOST
                </Button>
            </Grid> */}
        </>
    );
}
