import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Copyright from '../Copyright';

export default function EditCouch() {
    const [status, setStatus] = useState('');
    const [arrangement, setArrangement] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [allowChildren, setAllowChildren] = useState(false);
    const [allowPets, setAllowPets] = useState(false);
    const [allowSmoking, setAllowSmoking] = useState(false);
    const [allowWheelchair, setAllowWheelchair] = useState(false);
    const [description, setDescription] = useState('');
    const [publicTransportation, setPublicTransportation] = useState('');
    const [distanceCityCenter, setDistanceCityCenter] = useState('');

    const navigate = useNavigate();

    const arrangements = [
        {
            value: 'sharedBed',
            label: 'Shared Bed',
        },
        {
            value: 'shareRoom',
            label: 'Share Room',
        },
        {
            value: 'publicRoom',
            label: 'Public Room/Living Room',
        },
        {
            value: 'privateRoom',
            label: 'Private Room',
        },
        {
            value: 'Others',
            label: 'Others',
        }
    ];

    const hostStatus = [
        {
            value: 'availableToHost',
            label: 'Available To Host',
        },
        {
            value: 'iAmBusy',
            label: 'I Am Busy',
        },
        {
            value: 'mayBeAcceptingGuests',
            label: 'May Be Accepting Guests',
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
            distanceCityCenter
        };

        axios.post('http://localhost:5005/couches', requestBody)
            .then(response => {
                // redirect to login
                navigate('/')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
        // reset the form
        setStatus('')
        setArrangement('')
        setNumberOfPeople('')
        setAllowChildren('')
        setAllowPets('')
        setAllowSmoking('')
        setAllowWheelchair('')
        setDescription('')
        setPublicTransportation('')
        setDistanceCityCenter('')
        // refresh the list of the projects in ProjectList
        // props.refreshProjects()
    };

    const handleStatus = e => setStatus(e.target.value)
    const handleArrangement = e => setArrangement(e.target.value)
    const handleNumberOfPeople = e => setNumberOfPeople(e.target.value)

    const handleAllowChildren = e => setAllowChildren(e.target.checked)
    const handleAllowPets = e => setAllowPets(e.target.checked)
    const handleAllowSmoking = e => setAllowSmoking(e.target.checked)
    const handleAllowWheelchair = e => setAllowWheelchair(e.target.checked)

    const handleDescription = e => setDescription(e.target.value)
    const handlePublicTransportation = e => setPublicTransportation(e.target.value)
    const handleDistanceCityCenter = e => setDistanceCityCenter(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50 }}>
                    <MapsHomeWorkOutlinedIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    My Home
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <TextField
                                id="status"
                                select
                                required
                                fullWidth
                                label="Host Status"
                                value={status}
                                onChange={handleStatus}
                            >
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
                            <TextField
                                id="arrangement"
                                select
                                required
                                fullWidth
                                label="Sleeping Arrangement"
                                value={arrangement}
                                onChange={handleArrangement}
                            >
                                {arrangements.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="numberOfPeople"
                                required
                                fullWidth
                                label="Number of Guests"
                                type="number"
                                value={numberOfPeople}
                                onChange={handleNumberOfPeople}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    inputProps: { min: 0 }
                                }}
                                helperText="Maximum Accommocdate"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="distanceCityCenter"
                                required
                                fullWidth
                                label="Distance (km)"
                                type="number"
                                value={distanceCityCenter}
                                onChange={handleDistanceCityCenter}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    inputProps: { min: 0 }
                                }}
                                helperText="To the City Center"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    value={allowChildren}
                                    onChange={handleAllowChildren}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                            }
                                label="Kid Friendly"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    value={allowPets}
                                    onChange={handleAllowPets}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                            }
                                label="Pets Friendly"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    value={allowSmoking}
                                    onChange={handleAllowSmoking}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                            }
                                label="Smoking is Allowed"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    value={allowWheelchair}
                                    onChange={handleAllowWheelchair}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                            }
                                label="Wheelchair Accessible"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                label="More Information"
                                helperText="
                                Roommate Situation or What I want to exchange with Guests"
                                value={description}
                                onChange={handleDescription}
                            />
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

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<SaveOutlinedIcon />}>
                            Save
                        </Button>

                        {errorMessage && <h5>{errorMessage}</h5>}

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2">
                                    Back to the Homepage
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}
