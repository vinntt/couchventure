import { Container, Grid } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import CouchDetail from "../../components/Couches/CouchDetail";
import ProfileCardSideFeature from "../../components/Profile/ProfileCardSideFeature";
import ProfileTabs from "../../components/Profile/ProfileTabs";


export default function ProfileCouchPage() {
    const { userId } = useParams();

    return (
        <>
            <Container maxWidth='lg' disableGutters sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <ProfileCardSideFeature userId={userId} />
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item sx={{ mb: 2 }}>
                            <ProfileTabs userId={userId} />
                        </Grid>
                        <Grid item>
                            <CouchDetail userId={userId} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
