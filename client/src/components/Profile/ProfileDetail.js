import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from "@mui/icons-material/Edit";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import SmsIcon from "@mui/icons-material/Sms";
import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Divider, Grid, IconButton, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import service from "../../api/service";

function isProfileCompleted(profile) {
    return profile.age && profile.gender && profile.language && profile.introduction;
}

export default function ProfileDetail(props) {
    const [profile, setProfile] = useState(undefined);

    useEffect(() => {
        service
            .get(`/profile/${props.userId}`)
            .then(({ data: profile }) => {
                if (isProfileCompleted(profile)) {
                    setProfile(profile);
                } else {
                    setProfile(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.userId]);

    if (profile === false) {
        if (props.userId === "me") {
            return (
                <>
                    <Container maxWidth='lg'>
                        <Grid item xs={12}>
                            <Button href='/profile/me/edit' variant='contained' sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Complete my profile
                            </Button>
                            <Typography variant='h6' align='justify' color='text.secondary' paragraph>
                                Couchsurfers decide whom to meet based on profiles! Until you fill out your profile, people will not know what to expect and why they should hang out with you.
                            </Typography>
                        </Grid>
                    </Container>
                </>
            );
        }

        // Case of other people profile goes here.
    }

    return (
        <div>
            {profile && (
                // https://mui.com/api/container/
                // https://blog.theashishmaurya.me/how-to-create-a-tag-input-feature-in-reactjs-and-material-ui
                <Container maxWidth='md' disableGutters>
                    {/* https://codesandbox.io/s/lioc4z?file=/demo.js:924-1359 */}
                    <Accordion expanded disableGutters>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Grid container direction='row' alignItems='center'>
                                <Typography
                                    variant='h6'
                                    gutterBottom
                                >
                                    Say hi!
                                </Typography>
                            </Grid>
                            {props.userId === "me" && (
                                <Link href={`/profile/me/edit`}>
                                    <IconButton size='small' aria-label='edit' component='span'>
                                        <EditIcon fontSize='12' />
                                    </IconButton>
                                </Link>
                            )}
                        </AccordionSummary>
                        <Divider textAlign='left'></Divider>
                        <AccordionDetails sx={{ mt: 2 }}>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <PersonOutlineIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    {profile.age}, {profile.gender}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <SmsIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    Fluent in {profile.language.join(", ")}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1, mt: 2 }}>
                            <FormatQuoteIcon />
                                <Typography align='justify' color='text.secondary' sx={{ fontStyle: "italic" }}>
                                   {profile.introduction}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            )}
        </div>
    );
}
