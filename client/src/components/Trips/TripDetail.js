import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Container, Divider, Grid, IconButton, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import service from "../../api/service";
import moment from "moment";
import { useReducer } from "react";

export default function TripDetail(props) {
    const trip = props.trip;
    const startDate = moment(trip.startDate).format("DD-MM-YYYY");
    const endDate = moment(trip.endDate).format("DD-MM-YYYY");
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const deleteTrip = () => {
        service
            .delete(`/trips/${trip.id}`)
            .then(() => forceUpdate())
            .catch((err) => alert(err));
    };

    return (
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
                        <IconButton onClick={deleteTrip} size='small' aria-label='edit' component='span'>
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
                        {startDate}
                    </Typography>
                    <ArrowForwardIcon />
                    <Typography align='justify' color='text.secondary'>
                        {endDate}
                    </Typography>
                </Grid>
                <Typography align='justify' color='text.secondary' paragraph>
                    {trip.content}
                </Typography>
            </Container>
        </>
    );
}
