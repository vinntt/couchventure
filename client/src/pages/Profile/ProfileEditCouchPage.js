import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

import ProfileCardSideFeature from '../../components/Profile/ProfileCardSideFeature';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import CouchForm from "../../components/Couches/CouchForm";
import Footer from '../../components/Footer.js'

export default function ProfileEditCouchPage() {
    const { userId } = useParams()

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
                            <CouchForm userId={userId} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
