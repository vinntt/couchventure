import * as React from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import { MenuItem, Container, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Footer from '../Footer';

export default function EditProfile(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const navigate = useNavigate();
    const countries = [
        {
            value: 'Germany',
            label: 'Germany',
        }
    ];

    const cities = [
        {
            value: 'Berlin',
            label: 'Berlin',
        },
        {
            value: 'Frankfurt',
            label: 'Frankfurt',
        },
        {
            value: 'Hamburg',
            label: 'Hamburg',
        },
        {
            value: 'Munich',
            label: 'Munich',
        },
        {
            value: 'Others',
            label: 'Others',
        }

    ];


    const genders = [
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Female',
            label: 'Female',
        }, {
            value: 'Diverse',
            label: 'Diverse',
        }
    ]

    const languages = [
        {
            value: 'English',
            label: 'English',
        },
        {
            value: 'German',
            label: 'German',
        }, {
            value: 'Others',
            label: 'Others',
        }
    ]


    const handleSubmit = (event) => {
        event.preventDefault();
        const requestBody = { email, password, name, city, country }
        axios.post('http://localhost:5005/auth/signup', requestBody)
            .then(response => {
                // redirect to login
                navigate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
        // reset the form
        setName('')
        setEmail('')
        setPassword('')
        setCountry('')
        setCity('')
        // refresh the input field
        props.refreshProjects()
    };

    const handleName = e => setName(e.target.value)
    const handleCountry = e => setCountry(e.target.value)
    const handleCity = e => setCity(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50 }}>
                    <LockOutlinedIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit My Profile
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                type="text"
                                value={name}
                                onChange={handleName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="country"
                                select
                                required
                                fullWidth
                                label="Country"
                                value={country}
                                onChange={handleCountry}
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="city"
                                select
                                required
                                fullWidth
                                label="City"
                                value={city}
                                onChange={handleCity}
                            >
                                {cities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="age"
                                fullWidth
                                label="Age"
                                type="number"
                                // value={distanceCityCenter}
                                // onChange={handleDistanceCityCenter}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                    inputProps: { min: 0 }
                                }}
                            // helperText="To the City Center"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="gender"
                                select
                                fullWidth
                                label="Gender"
                            // value={gender}
                            // onChange={handleGender}
                            >
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="language"
                                select
                                fullWidth
                                label="Language"
                            // value={language}
                            // onChange={handleLanguage}
                            >
                                {languages.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* https://codesandbox.io/s/givp5 */}
                        <Grid item xs={12}>
                            <TextField
                                id="introduction"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                label="More Information"
                                helperText="Let the others travellers know more about you"
                            // value={introduction}
                            // onChange={handleIntroduction}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<SaveOutlinedIcon />}>
                        Save
                    </Button>

                    {errorMessage && <h5>{errorMessage}</h5>}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/profile/me" variant="body2">
                                Back To My Profile
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Container>
    );
}
