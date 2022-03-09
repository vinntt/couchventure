import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Badge, ImageList, ImageListItem, MenuItem, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackspaceIcon from '@mui/icons-material/Backspace';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useReducer } from 'react';
import service from '../../api/service';
import CloudinaryAvatar from '../UI/CloudinaryAvatar';

const allowedTypes = [
    'image/gif',
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/apng',
    'image/webp',
];

const DeleteImageButton = styled(Button)(({ theme }) => ({
    width: 28,
    height: 28,
    minWidth: 28,
    minHeight: 28,
    padding: 0,
    margin: 0,
    borderRadius: `50%`,
}));

export default function CouchForm() {
    const [couchId, setCouchId] = useState(undefined);
    const [status, setStatus] = useState("");
    const [arrangement, setArrangement] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [allowChildren, setAllowChildren] = useState(false);
    const [allowPets, setAllowPets] = useState(false);
    const [allowSmoking, setAllowSmoking] = useState(false);
    const [allowWheelchair, setAllowWheelchair] = useState(false);
    const [description, setDescription] = useState("");
    const [publicTransportation, setPublicTransportation] = useState("");
    const [distanceCityCenter, setDistanceCityCenter] = useState("");
    const [couchImg, setCouchImg] = useState([]);

    const navigate = useNavigate();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const arrangements = [
        {
            value: "Shared Bed",
            label: "Shared Bed",
        },
        {
            value: "Share Room",
            label: "Share Room",
        },
        {
            value: "Public Room",
            label: "Public Room",
        },
        {
            value: "Private Room",
            label: "Private Room",
        },
        {
            value: "Others",
            label: "Others",
        },
    ];

    const hostStatus = [
        {
            value: "Available To Host",
            label: "Available To Host",
        },
        {
            value: "I Am Busy",
            label: "I Am Busy",
        },
        {
            value: "May Be Accepting Guests",
            label: "May Be Accepting Guests",
        },
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = {
            status,
            arrangement,
            numberOfPeople,
            allowChildren,
            allowPets,
            allowSmoking,
            allowWheelchair,
            description,
            publicTransportation,
            distanceCityCenter,
            couchImg,
        };

        // https://github.com/axios/axios#request-method-aliases
        service
            .request({
                url: couchId ? `/couches/${couchId}` : "/couches",
                method: couchId ? "put" : "post",
                data: requestBody,
            })
            .then((response) => {
                // redirect to login
                navigate("/profile/me/couch");
            })
            .catch((err) => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });

        // setStatus('');
        // setArrangement('');
        // setNumberOfPeople('');
        // setAllowChildren('');
        // setAllowPets('');
        // setAllowSmoking('');
        // setAllowWheelchair('');
        // setDescription('');
        // setPublicTransportation('');
        // setDistanceCityCenter('');
        // setCouchImg([]);
    };

    const handleStatus = (e) => setStatus(e.target.value);
    const handleArrangement = (e) => setArrangement(e.target.value);
    const handleNumberOfPeople = (e) => setNumberOfPeople(e.target.value);
    const handleAllowChildren = (e) => setAllowChildren(e.target.checked);
    const handleAllowPets = (e) => setAllowPets(e.target.checked);
    const handleAllowSmoking = (e) => setAllowSmoking(e.target.checked);
    const handleAllowWheelchair = (e) => setAllowWheelchair(e.target.checked);
    const handleDescription = (e) => setDescription(e.target.value);
    // const handlePublicTransportation = e => setPublicTransportation(e.target.value)
    const handleDistanceCityCenter = (e) => setDistanceCityCenter(e.target.value);

    const updateCouchImg = (images) => {
        setCouchImg(images);

        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        // Force update because react does not rerender when there is a new image. No idea why.
        forceUpdate();
    };

    const handleCouchImg = (e) => {
        if (!e.target.value) {
            return;
        }

        const file = e.target.files[0];

        if (!allowedTypes.includes(file.type)) {
            // TODO: Display an error message.
            console.log(`Invalid file type ${file.type}`);

            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = function (upload) {
            couchImg.push(upload.target.result);

            updateCouchImg(couchImg);
        };

        fileReader.readAsDataURL(file);
    };

    const deleteCouchImg = (idx) => {
        couchImg.splice(idx, 1);

        updateCouchImg(couchImg);
    };

    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        service
            .get("/profile/me/couch")
            .then(({ data: couch }) => {
                setCouchId(couch.id);
                setStatus(couch.status);
                setArrangement(couch.arrangement);
                setNumberOfPeople(couch.numberOfPeople);
                setAllowChildren(couch.allowChildren);
                setAllowPets(couch.allowPets);
                setAllowSmoking(couch.allowSmoking);
                setAllowWheelchair(couch.allowWheelchair);
                setDescription(couch.description);
                // setPublicTransportation(couch.publicTransportation);
                setDistanceCityCenter(couch.distanceCityCenter);
                setCouchImg(couch.couchImg || []);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 7,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component='h1' variant='h5'>
                    My Home
                </Typography>

                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id='status' select required fullWidth label='Host Status' value={status} onChange={handleStatus}>
                                {hostStatus.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            {/* https://codesandbox.io/s/pd6xel?file=/demo.js:166-361 */}
                            {/* https://mui.com/components/text-fields/ */}
                            <TextField id='arrangement' select required fullWidth label='Sleeping Arrangement' value={arrangement} onChange={handleArrangement}>
                                {arrangements.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='numberOfPeople'
                                required
                                fullWidth
                                label='Number of Guests'
                                type='number'
                                value={numberOfPeople}
                                onChange={handleNumberOfPeople}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    inputProps: { min: 0 },
                                }}
                                helperText='Maximum Accommodate'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='distanceCityCenter'
                                required
                                fullWidth
                                label='Distance (km)'
                                type='number'
                                value={distanceCityCenter}
                                onChange={handleDistanceCityCenter}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    inputProps: { min: 0 },
                                }}
                                helperText='To the City Center'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox size='small' checked={allowChildren} onChange={handleAllowChildren} />} label='Kid Friendly' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox size='small' checked={allowPets} onChange={handleAllowPets} />} label='Pets Friendly' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox size='small' checked={allowSmoking} onChange={handleAllowSmoking} />} label='Smoking is Allowed' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox size='small' checked={allowWheelchair} onChange={handleAllowWheelchair} />} label='Wheelchair Accessible' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='description'
                                fullWidth
                                multiline
                                rows={3}
                                variant='outlined'
                                label='More Information'
                                helperText='
                                Roommate Situation or What I want to exchange with Guests'
                                value={description}
                                onChange={handleDescription}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageList sx={{ width: 500, overflow: "visible" }} cols={3} rowHeight={164}>
                                {couchImg.map((img, idx) => (
                                    <Badge
                                        key={`couch-image-${idx}`}
                                        overlap='circular'
                                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                        badgeContent={
                                            <DeleteImageButton variant='contained' component='label' color='error' onClick={() => deleteCouchImg(idx)}>
                                                <HighlightOffIcon fontSize='small' />
                                            </DeleteImageButton>
                                        }
                                    >
                                        <ImageListItem sx={{ maxHeight: 164, overflow: "hidden" }}>
                                            <img src={img} alt='' />
                                        </ImageListItem>
                                    </Badge>
                                ))}

                                <ImageListItem>
                                    <Button variant='contained' component='label' sx={{ width: "100%", height: "100%", border: "2px dashed #4F606F", background: "#eee !important", boxShadown: "none" }}>
                                        <AddPhotoAlternateIcon fontSize='large' color='info' />
                                        <input accept='image/*' type='file' hidden onChange={handleCouchImg} />
                                    </Button>
                                </ImageListItem>
                            </ImageList>
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                id="publicTransportation"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                label="Public Transportation Access"
                                // helperText=""
                                value={publicTransportation}
                                onChange={handlePublicTransportation}
                            />

                        </Grid> */}

                        <Grid item xs={12} sm={6}>
                            <Button href='/profile/me/couch' type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 1, py: 1 }} startIcon={<BackspaceIcon />}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 1, py: 1 }} endIcon={<SaveOutlinedIcon />}>
                                Save
                            </Button>
                        </Grid>
                        {errorMessage && <h5>{errorMessage}</h5>}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
