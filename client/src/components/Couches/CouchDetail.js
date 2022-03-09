import { Typography, Grid, Button, Container, Divider, Accordion, AccordionSummary, AccordionDetails, ImageList, ImageListItem, Modal, Box, Link, IconButton } from "@mui/material";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import SmokingRoomsOutlinedIcon from "@mui/icons-material/SmokingRoomsOutlined";
import AccessibleOutlinedIcon from "@mui/icons-material/AccessibleOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import service from "../../api/service";
import cloudinaryResize from "../../utils/cloudinary";

const modelBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: 0,
    padding: 0,
    boxShadow: 24,
    "&:focus-visible": {
        outline: "none",
    },
};

export default function CouchDetail(props) {
    const isOwnCouch = props.userId === "me";
    const [couch, setCouch] = useState(undefined);
    // const [couchImg, setCouchImg] = useState(undefined);
    const [modalImage, setModalImage] = useState(false);

    const handleOpenModal = (img) => setModalImage(img);
    const handleCloseModal = () => setModalImage(undefined);

    const editButton =
        props.userId === "me" ? (
            <Grid direction='row' xs={2} sx={{ textAlign: "right" }}>
                <Link href={`/profile/me/couch/edit`}>
                    <IconButton size='small' aria-label='edit' component='span'>
                        <EditIcon fontSize='12' />
                    </IconButton>
                </Link>
            </Grid>
        ) : (
            ""
        );

    useEffect(() => {
        service
            .get(`/profile/${props.userId}/couch`)
            .then(({ data: couch }) => {
                couch.couchImg = couch.couchImg || [];

                setCouch(couch);
                // setCouchImg(couch.couchImg);
            })
            .catch((err) => {
                setCouch(false);
                console.log(err);
            });
    }, [props.userId]);

    if (couch === false) {
        if (isOwnCouch) {
            return (
                <>
                    <Container maxWidth='md' disableGutters>
                        <Grid item xs={12}>
                            <Typography align='justify' color='text.secondary' sx={{ fontStyle: "italic" }} variant='h6'>
                                <FormatQuoteIcon />
                                There is a thousand "cool way" to meet people around the world, and Couchventure is one of them. Open the door, get to know more friends, exchange culture, and listen to amazing stories
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button href='/profile/me/couch/edit' variant='contained' sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Are you ready to host travellers?
                            </Button>
                        </Grid>
                    </Container>
                </>
            );
        }

        // Case of other people profile goes here.
    }

    return (
        <>
            {couch && (
                <Container maxWidth='md' disableGutters>
                    <Accordion expanded disableGutters>
                        <AccordionSummary sx={{ margin: 0 }}>
                            <Grid container direction='row' alignItems='center'>
                                <Typography
                                    variant='h6'
                                    // gutterBottom
                                    // sx={{ marginTop: "10px", marginLeft: "0", padding: "0" }}
                                >
                                    Preferences
                                </Typography>
                            </Grid>
                            {editButton}
                        </AccordionSummary>
                        <Divider textAlign='left'></Divider>
                        <AccordionDetails sx={{ mt: 2 }}>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <EmojiPeopleOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Max Number of Guests:</b> {couch.numberOfPeople}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <ChildCareOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Kid Friendly:</b> {couch.allowChildren ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <PetsOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Pet Friendly:</b> {couch.allowPets ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <SmokingRoomsOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Smoking Allowed:</b> {couch.allowSmoking ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <AccessibleOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Wheelchair Accessible:</b> {couch.allowWheelchair ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded disableGutters>
                        <AccordionSummary sx={{ margin: 0 }}>
                            <Grid container direction='row' alignItems='center'>
                                <Typography
                                    variant='h6'
                                    // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                                >
                                    Sleeping Arrangement
                                </Typography>
                            </Grid>
                            {editButton}
                        </AccordionSummary>
                        <Divider textAlign='left'></Divider>
                        <AccordionDetails sx={{ mt: 2 }}>
                            <Grid container direction='row' alignItems='center'>
                                <BedroomChildOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    {couch.arrangement}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded disableGutters>
                        <AccordionSummary sx={{ margin: 0 }}>
                            <Grid container direction='row' alignItems='center'>
                                <Typography
                                    variant='h6'
                                    // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                                >
                                    More details
                                </Typography>
                            </Grid>
                            {editButton}
                        </AccordionSummary>
                        <Divider textAlign='left'></Divider>
                        <AccordionDetails sx={{ mt: 2 }}>
                            <Grid container direction='row' alignItems='center'>
                                <LocationCityOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    <b>Distance to the city center:</b> {couch.distanceCityCenter}km
                                </Typography>
                            </Grid>
                            <Grid container direction='row' sx={{ mt: 2 }}>
                                <Typography align='justify' color='text.secondary' paragraph>
                                    {couch.description}
                                </Typography>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded disableGutters>
                        <AccordionSummary sx={{ margin: 0 }}>
                            <Grid container direction='row' alignItems='center'>
                                <Typography
                                    variant='h6'
                                    // sx={{ marginTop: "30px", marginLeft: "0", padding: "0" }}
                                >
                                    Photos
                                </Typography>
                            </Grid>
                            {editButton}
                        </AccordionSummary>
                        <Divider textAlign='left'></Divider>
                        <AccordionDetails sx={{ mt: 2 }}>
                            <ImageList sx={{ width: "100%" }} cols={4}>
                                {couch.couchImg.map((img, idx) => (
                                    <ImageListItem key={`couch-image-${idx}`} onClick={() => handleOpenModal(img)} sx={{ cursor: "pointer" }}>
                                        <img src={cloudinaryResize(img, "c_fill,w_336,h_336")} alt='' />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </AccordionDetails>
                    </Accordion>
                    <Modal open={modalImage} onClose={handleCloseModal}>
                        <Box sx={modelBoxStyle}>
                            <img src={cloudinaryResize(modalImage, "c_fill,w_800,h_600")} alt='' style={{ width: "100%", height: "auto", display: "block" }} />
                        </Box>
                    </Modal>
                </Container>
            )}
        </>
    );
}
