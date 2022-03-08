import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from '../Footer';
import service from '../../api/service';

export default function AddTrip(props) {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [content, setContent] = useState('');

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
        const requestBody = {
            city,
            country,
            startDate,
            endDate,
            numberOfPeople,
            content,
        };

        service.post('/trips', requestBody)
            .then(response => {
                // redirect to login
                navigate('/trips')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
            // reset the form
            setCity('')
            setCountry('')
            setNumberOfPeople('')
            setContent('')
		props.refreshProjects()
    };

    const handleCity = e => setCity(e.target.value)
    const handleCountry = e => setCountry(e.target.value)
    // const handleStartDate = e => setStartDate(e.target.value)
    // const handleEndDate = e => setEndDate(e.target.value)
    const handleNumberOfPeople = e => setNumberOfPeople(e.target.value)
    const handleContent = e => setContent(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleStayDuration = stayDuration => {
        setStartDate(stayDuration[0])
        setEndDate(stayDuration[1])
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50 }}>
                    <TravelExploreOutlinedIcon sx={{ fontSize: 32}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    My Travel Plan
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        {/* https://stackoverflow.com/questions/69458279/module-not-found-cant-resolve-mui-lab-adapterdatefns */}
                            {/* https://mui.com/components/date-range-picker/ */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateRangePicker
                                    startText="Check-in"
                                    endText="Check-out"
                                    required
                                    value={[startDate, endDate]}
                                    onChange={handleStayDuration}
                                    renderInput={(startProps, endProps) => (
                                        <React.Fragment>
                                            <TextField {...startProps} />
                                            <Box sx={{ mx: 2 }}> to </Box>
                                            <TextField {...endProps} />
                                        </React.Fragment>
                                    )}
                                />
                            </LocalizationProvider>
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
                                    inputProps: { min: 0}
                                }}
                                helperText="Maximum Accommocdate"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="content"
                                fullWidth
                                multiline
                                rows={3}
                                variant="outlined"
                                label="Message to your host"
                                helperText="Decribe your travel plan"
                                value={content}
                                onChange={handleContent}
                            />
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 2}} endIcon={<SendOutlinedIcon />}>
                            Create a Trip
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
            <Footer sx={{ mt: 5 }} />
        </Container>
    );
}
