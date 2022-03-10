import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert, Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../api/service";
import { AuthContext } from "../../context/auth";

export default function SignIn() {
    const navigate = useNavigate();
    const { isLoggedIn, storeToken, verifyStoredToken } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = { email, password };

        setLoading(true);

        service
            .post("/auth/login", requestBody)
            .then((response) => {
                const token = response.data.authToken;

                storeToken(token);
                // verifyStoredToken return a promise now we can chain a .then and wait for the response
                verifyStoredToken().then(() => {
                    navigate("/");
                });
            })
            .catch((err) => {
                console.log(err);
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            })
            .finally(() => setLoading(false));
    };

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    if (!loading && isLoggedIn) {
        navigate("/");
    }

    return (
        <Grid container component='main' sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    // https://awik.io/generate-random-images-unsplash-without-using-api/
                    backgroundImage: "url(https://source.unsplash.com/random/?nature,landscape)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 50, height: 50 }}>
                        <LockOutlinedIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {errorMessage && (
                            <Grid item xs={12} sx={{mb:2}}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                        )}
                        <TextField margin='normal' required fullWidth id='email' label='Email Address' name='email' type='text' value={email} onChange={handleEmail} />
                        <TextField margin='normal' required fullWidth name='password' label='Password' type='password' id='password' value={password} onChange={handlePassword} />
                        <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 5, py: 2 }}>
                            Sign In
                        </Button>

                        {errorMessage && <h5>{errorMessage}</h5>}

                        <Grid container>
                            <Grid item xs>
                                <Link to='#' variant='body2'>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/signup' variant='body2'>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
