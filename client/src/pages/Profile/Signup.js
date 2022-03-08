import * as React from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import { MenuItem, Container, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../../components/Footer';
import service from '../../api/service';

function SignUp() {
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


    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = { email, password, name, city, country }

        service.post('/auth/signup', requestBody)
            .then(response => {
                // redirect to login
                navigate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            });

        setName('');
        setEmail('');
        setPassword('');
        setCountry('');
        setCity('');
    };

    const handleEmail = e => setEmail(e.target.value)
    const handleName = e => setName(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
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
                    Sign up
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="text"
                                value={email}
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePassword}
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
                            // helperText="Please select your country"
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
                            // helperText="Please select your city"
                            >
                                {cities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" required />}
                                label="I want be a part of the Couchventure community"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2 }}>
                        Sign Up
                    </Button>

                    {errorMessage && <h5>{errorMessage}</h5>}

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Container>
    );
}

export default SignUp;
