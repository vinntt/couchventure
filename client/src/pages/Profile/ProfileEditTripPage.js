import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../api/service";
import ProfileCardSideFeature from "../../components/Profile/ProfileCardSideFeature";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import TripForm from "../../components/Trips/TripForm";


export default function ProfileEditTripPage() {
    const userId = "me";
    const { tripId } = useParams();
    const [trip, setTrip] = useState({ id: undefined });

    useEffect(() => {
        if (!tripId) {
            return;
        }

        service
            .get(`/trips/${tripId}`)
            .then(({ data: trip }) => {
                setTrip(trip);
            })
            .catch((err) => console.log(err));
    }, [tripId]);

    return (
        <>
            <Container maxWidth='lg' disableGutters sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <ProfileCardSideFeature userId={userId} />
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item>
                            <ProfileTabs userId={userId} />
                        </Grid>
                        <Grid item>
                            <TripForm userId={userId} trip={trip} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
