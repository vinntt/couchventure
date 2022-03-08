import { Typography, Grid, Button, Container, Divider, Accordion, AccordionSummary, AccordionDetails, ImageList, ImageListItem } from '@mui/material';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react";
import service from '../../api/service';

export default function CouchDetail(props) {
    const [couch, setCouch] = useState(undefined)
    // const [couchImg, setCouchImg] = useState(undefined);

    useEffect(() => {
        service.get(`/profile/${props.userId}/couch`)
            .then(({ data: couch }) => {
                console.log(couch)
                setCouch(couch)
                // setCouchImg(couch.couchImg);
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.userId]);

    if (!couch) {
        if (props.userId === "me") {
            return (
                <>
                    <Container maxWidth="lg">
                        <Grid item xs={12} >
                            <Button href="/profile/me/couch/edit" variant="contained" sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Are you ready to host travellers?
                            </Button>
                        </Grid>
                    </Container>
                </>
            )
        }

        // Case of other people profile goes here.
    }

    // const allowWheelchair = () => {
    //     if (couch.allowWheelchair === 1) {
    //         return 'YES'
    //     }

    //     return 'NO'
    // }

    return (
        <>
            {couch &&
                <Container maxWidth="md">
                    <br />
                    <Accordion expanded>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Typography
                                variant="h5"
                            // gutterBottom
                            // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                            >
                                Preferences
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider textAlign="left"></Divider>
                            <br />
                            <Grid container direction="row" alignItems="center">
                                <EmojiPeopleOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Max Number of Guests: {couch.numberOfPeople}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <ChildCareOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Kid Friendly: {couch.allowChildren ? "Yes": "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <PetsOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Pet Friendly: {couch.allowPets ? "Yes": "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <SmokingRoomsOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Smoking Allowed: {couch.allowSmoking ? "Yes": "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <AccessibleOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Wheelchair Accessible: {couch.allowWheelchair ? "Yes": "No"}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Typography
                                variant="h5"
                            // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                            >
                                Sleeping Arrangement
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider textAlign="left"></Divider>
                            <br />
                            <Grid container direction="row" alignItems="center">
                                <BedroomChildOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    {couch.arrangement}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Typography
                                variant="h5"
                            // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                            >
                                More details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider textAlign="left"></Divider>
                            <br />
                            <Grid container direction="row" alignItems="center">
                                <LocationCityOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Distance to the city center: {couch.distanceCityCenter}km
                                </Typography>
                            </Grid>
                            <Typography align="jutify" color="text.secondary" paragraph>
                                {couch.description}
                            </Typography>
                        </AccordionDetails>
                        <AccordionSummary sx={{ margin: 0 }} content={{ margin: 0 }}>
                            <Typography
                                variant="h5"
                            // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                            >
                                Photos
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                {/* {itemData.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))} */}
                            </ImageList>
                        </AccordionDetails>

                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Button href='/profile/me/couch/edit' variant="contained" sx={{ mt: 2, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Edit
                            </Button>
                        </Grid>
                    </Accordion>

                </Container>
            }
        </>
    )
}
