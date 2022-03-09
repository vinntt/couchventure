import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import ProfileCardSideFeature from '../../components/Profile/ProfileCardSideFeature';
import ProfileDetail from '../../components/Profile/ProfileDetail';
import ProfileTabs from '../../components/ProfileTabs';
import TripCard from '../../components/Trips/TripCard';

export default function ProfilePage() {
    const { userId } = useParams()

    return (
        <>
            <Container maxWidth="lg" disableGutters sx={{mt: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <ProfileCardSideFeature userId={userId} />
                    </Grid>
                    <Grid item xs={6} md={8}>
                    <Grid item >
                        <ProfileTabs userId={userId} />
                    </Grid>
                    <Grid item >
                        <TripCard userId={userId} />
                    </Grid>
                    <Grid item >
                        <ProfileDetail userId={userId} />
                    </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};
