import * as React from 'react';
import { Container, Grid } from '@mui/material';

import ProfileCardSideFeature from '../../components/Profile/ProfileCardSideFeature';
import ProfileTabs from '../../components/ProfileTabs';
import EditProfile from '../../components/Profile/EditProfile';

export default function ProfileEditPage() {
    const userId = "me";

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
                            <EditProfile userId={userId} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
