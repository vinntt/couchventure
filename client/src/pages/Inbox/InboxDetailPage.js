import { Container, Grid } from "@mui/material";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import InboxMessageList from "../../components/Inbox/InboxMessageList";
import InboxRequestForm from "../../components/Inbox/InboxRequestForm";
import ProfileCardSideFeature from "../../components/Profile/ProfileCardSideFeature";

export default function InboxDetailPage() {
    const { userId } = useParams();
    const [searchParams] = useSearchParams();

    if (userId === "me") {
        return <Navigate to='/inbox' />;
    }

    const offer = searchParams.get("offer");

    return (
        <>
            <Container maxWidth='lg' disableGutters sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <ProfileCardSideFeature userId={userId} />
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Grid item>
                            <InboxRequestForm recipientId={userId} offer={offer} />
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
                            <InboxMessageList recipientId={userId} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
