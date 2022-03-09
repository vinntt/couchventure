
import { Typography, Grid, Button, Container, Divider, Chip, Link, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SmsIcon from '@mui/icons-material/Sms';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react"
import service from '../../api/service';

function isProfileCompleted(profile) {
    return profile.age
        && profile.gender
        && profile.language
        && profile.introduction
}

export default function ProfileDetail(props) {
    const [profile, setProfile] = useState(undefined);

    useEffect(() => {
        service.get(`/profile/${props.userId}`)
            .then(({ data: profile }) => {
                if (isProfileCompleted(profile)) {
                    setProfile(profile)
                } else {
                    setProfile(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.userId]);

    if (profile === false) {
        if (props.userId === "me") {
            return (
                <>
                    <Container maxWidth="lg">
                        <Grid item xs={12} >
                            <Button href="/profile/me/edit" variant="contained" sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Complete my profile
                            </Button>
                            <Typography variant="h6" align="justify" color="text.secondary" paragraph>
                                Couchsurfers decide whom to meet based on profiles! Until you fill out your profile, people will not know what to expect and why they should hang out with you.
                            </Typography>
                        </Grid>
                    </Container>
                </>
            )
        }

        // Case of other people profile goes here.
    }

    return (
        <div>
            {profile &&
                // https://mui.com/api/container/
                // https://blog.theashishmaurya.me/how-to-create-a-tag-input-feature-in-reactjs-and-material-ui
                <Container maxWidth="md" disableGutters>
                    {/* https://codesandbox.io/s/lioc4z?file=/demo.js:924-1359 */}
                    <Accordion expanded>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Typography
                                variant="h6"
                            // gutterBottom
                            // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                            >
                                Let me introduce a bit more 🤩
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider textAlign="left"></Divider>
                            <br />
                            <Grid container direction="row" alignItems="center" sx={{ mb: 1 }}>
                                <AccessibilityNewIcon sx={{ mr: 1 }} color="disabled" />
                                <Typography align="justify" color="text.secondary">
                                    {profile.age}, {profile.gender}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center" sx={{ mb: 1 }}>
                                <SmsIcon sx={{ mr: 1 }} color="disabled" />
                                <Typography align="justify" color="text.secondary">
                                    Fluent in {profile.language.join(", ")}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Button href="/profile/me/edit" variant="contained" sx={{ mt: 2, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Edit
                            </Button>
                        </Grid>
                    </Accordion>
                </Container>
            }
        </div>
    )
}
