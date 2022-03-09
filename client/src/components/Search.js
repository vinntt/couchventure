// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import service from '../api/service';
import CloudinaryAvatar from './UI/CloudinaryAvatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChairIcon from '@mui/icons-material/Chair';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Button, Typography, Skeleton, CardActionArea } from '@mui/material';

function isProfileCompleted(profile) {
    return profile.age && profile.gender && profile.language && profile.introduction;
}

export default function Search(props) {
    const [name, setName] = useState(undefined);
    // const [city, setCity] = useState(undefined);
    // const [country, setCountry] = useState(undefined);
    // const [status, setStatus] = useState(undefined);
    const [profileImg, setProfileImg] = useState(undefined);
    // const [profile, setProfile] = useState(undefined);

    // useEffect(() => {
    //     service
    //         .get(`/profile/${props.userId}`)
    //         .then(({ data: profile }) => {
    //             if (isProfileCompleted(profile)) {
    //                 setProfile(profile);
    //             } else {
    //                 setProfile(false);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [props.userId]);

    // if (profile === false) {
    //     if (props.userId === "me") {
    //         return (
    //             <>
    //             </>
    //         );
    //     }

    //     // Case of other people profile goes here.
    // }

    return (
        <>
            <Container maxWidth="lg">
                <Card elevation={1} sx={{ textAlign: 'center', marginTop: 3, width: 350, maxWidth: 350 }}>
                    <CardActionArea>
                        <br />
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12} sm={6}>
                                {typeof profileImg !== "undefined" ? (
                                    <CloudinaryAvatar alt={name} src={profileImg} width={130} height={130} />
                                ) : (
                                    <Skeleton variant="rectangular" width={130} height={130} sx={{ marginLeft: '10px' }} />
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} alignItems="left">
                                <Typography gutterBottom variant="body1" color="grey" align="left" noWrap="true" >
                                    {/* {name} */}
                                    <strong>Andy Feldmann</strong>
                                </Typography>
                                <Grid container direction="row" alignItems="left" sx={{ mb: 1 }} wrap='nowrap' >
                                    <LocationOnIcon fontSize="small" />
                                    <Typography gutterBottom variant="caption" color="grey" noWrap="true" >

                                        {/* {city}, {country} */}
                                        Berlin, Germany
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" alignItems="left" sx={{ mb: 1 }} wrap='nowrap'>
                                    <LanguageIcon fontSize="small" />
                                    <Typography gutterBottom variant="caption" color="grey" noWrap="true" >
                                        Speaks English, German, French,
                                    </Typography>
                                </Grid>
                                <Grid container direction="row" alignItems="left" sx={{ mb: 1 }} wrap='nowrap'>
                                    <ChairIcon fontSize="small" />
                                    <Typography gutterBottom variant="caption" color="grey" noWrap="true" >
                                        Maybe Accepting Guests
                                    </Typography>
                                </Grid>

                                {/* <Typography variant="h5" color={status === "Available To Host" ? "green" : "orange"}> */}
                                {/* <strong> {status} </strong> */}
                                {/* </Typography> */}
                            </Grid>
                        </Grid>
                    </CardActionArea>
                    <Grid container direction="row" alignItems="left" sx={{ m: 1, maxHeight: 52 }} wrap='nowrap' >
                        <AccountCircleIcon fontSize="small" />
                        <Typography gutterBottom alignt="left" variant="caption" color="grey"  >
                             not in Berlin atm, sorry! can give tips thohey dear couchsurfers! I don't want to waste your time reading through a bunch of empty words here—just scroll through here—just scroll through here—just scroll through here—just scroll through here—just scroll through through here—just scroll through through here—just scroll through
                        </Typography>
                    </Grid>
                </Card>
            </Container>
        </>
    );
}
