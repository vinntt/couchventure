import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import InboxMessageList from "../../components/Inbox/InboxMessageList";
import InboxRequestForm from "../../components/Inbox/InboxRequestForm";
import ProfileCardSideFeature from "../../components/Profile/ProfileCardSideFeature";

export default function InboxDetailPage() {
    const { userId } = useParams();
    const [searchParams] = useSearchParams();
    const [timestamp, setTimestamp] = useState(new Date());

    const offer = searchParams.get("offer");

    const forceUpdate = () => {
        setTimestamp(new Date());
    };

    if (userId === "me") {
        return <Navigate to='/inbox' />;
    }

    return (
        <>
            <Container maxWidth='lg' disableGutters sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <ProfileCardSideFeature userId={userId} />
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item>
                            <InboxRequestForm recipientId={userId} offer={offer} timestamp={timestamp} onRequest={forceUpdate} onCancel={forceUpdate} onDecline={forceUpdate} />
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
                            <InboxMessageList recipientId={userId} timestamp={timestamp} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
