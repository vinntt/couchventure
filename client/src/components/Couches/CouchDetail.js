import { Typography, Grid, Button, Container, Divider, Accordion, AccordionSummary, AccordionDetails, ImageList, ImageListItem, Modal, Box } from '@mui/material';
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
import cloudinaryResize from '../../utils/cloudinary';

const modelBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: 0,
    padding: 0,
    boxShadow: 24,
    '&:focus-visible': {
        outline: 'none',
    },
};

export default function CouchDetail(props) {
    const [couch, setCouch] = useState(undefined)
    // const [couchImg, setCouchImg] = useState(undefined);
    const [modalImage, setModalImage] = useState(false);

    const handleOpenModal = (img) => setModalImage(img);
    const handleCloseModal = () => setModalImage(undefined);

    useEffect(() => {
        service.get(`/profile/${props.userId}/couch`)
            .then(({ data: couch }) => {
                couch.couchImg = couch.couchImg || [];

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
                                    Kid Friendly: {couch.allowChildren ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <PetsOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Pet Friendly: {couch.allowPets ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <SmokingRoomsOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Smoking Allowed: {couch.allowSmoking ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid container direction="row" alignItems="center">
                                <AccessibleOutlinedIcon sx={{ mr: 1 }} />
                                <Typography align="jutify" color="text.secondary">
                                    Wheelchair Accessible: {couch.allowWheelchair ? "Yes" : "No"}
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
                            <Divider textAlign="left"></Divider>
                            <br />
                            <ImageList sx={{ width: '100%' }} cols={4}>
                                {couch.couchImg.map((img, idx) => (
                                    <ImageListItem key={`couch-image-${idx}`} onClick={() => handleOpenModal(img)} sx={{cursor: 'pointer'}}>
                                        <img src={cloudinaryResize(img, "c_fill,w_336,h_336")} alt="" />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </AccordionDetails>

                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Button href='/profile/me/couch/edit' variant="contained" sx={{ mt: 2, mb: 1, py: 1 }} endIcon={<EditOutlinedIcon />}>
                                Edit
                            </Button>
                        </Grid>
                    </Accordion>
                    <Modal
                        open={modalImage}
                        onClose={handleCloseModal}
                    >
                        <Box sx={modelBoxStyle}>
                            <img src={cloudinaryResize(modalImage, "c_fill,w_800,h_600")} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </Box>
                    </Modal>
                </Container>
            }
        </>
    )
}
