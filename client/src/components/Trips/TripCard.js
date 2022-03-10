import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import service from "../../api/service";
import TripDetail from "./TripDetail";

export default function TripCard(props) {
    const [trips, setTrips] = useState([]);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    const deleteTrip = (idx) => {
        trips.splice(idx, 1);

        setTrips(trips);
        forceUpdate();
    };

    useEffect(() => {
        service
            .get(`/profile/${props.userId}/trips`)
            .then(({ data: trips }) => {
                setTrips(trips);
            })
            .catch((err) => console.log(err));
    }, [props.userId]);

    if (trips.length === 0 && props.userId !== "me") {
        return <></>;
    }

    return (
        <>
            <Container maxWidth='md' disableGutters sx={{ mb: 2, mt: 2 }}>
                {/* https://codesandbox.io/s/lioc4z?file=/demo.js:924-1359 */}
                <Accordion expanded disableGutters>
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
                    <Divider textAlign='left'></Divider>
                    <AccordionDetails>
                        {trips.length === 0 ? (
                            <Grid container direction='row' sx={{ mt: 2 }}>
                                <Typography align='justify' color='text.secondary' sx={{ fontStyle: "italic" }}>
                                    <FormatQuoteIcon />
                                    Let make your trip great with a new adventure, have a thousand of memory, meet new friends, and stay with local hosts.
                                </Typography>
                            </Grid>
                        ) : (
                            trips.map((trip, idx) => (
                                <>
                                    {idx > 0 && <Divider textAlign='left'></Divider>}
                                    <TripDetail userId={props.userId} trip={trip} onDelete={() => deleteTrip(idx)} />
                                </>
                            ))
                        )}
                    </AccordionDetails>
                </Accordion>
            </Container>
        </>
    );
}
