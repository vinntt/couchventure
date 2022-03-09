import { styled } from "@mui/material/styles";
import { Button, TextField, Checkbox, Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import { ListItemText, InputLabel, Select } from "@mui/material";
import { MenuItem, Container, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../../api/service";
import CloudinaryAvatar from "../UI/CloudinaryAvatar";

const allowedTypes = ["image/gif", "image/jpg", "image/jpeg", "image/png", "image/apng", "image/webp"];

const countries = [
    {
        value: "Germany",
        label: "Germany",
    },
];

const cities = [
    {
        value: "Berlin",
        label: "Berlin",
    },
    {
        value: "Frankfurt",
        label: "Frankfurt",
    },
    {
        value: "Hamburg",
        label: "Hamburg",
    },
    {
        value: "Munich",
        label: "Munich",
    },
    {
        value: "Others",
        label: "Others",
    },
];

const genders = [
    {
        value: "Male",
        label: "Male",
    },
    {
        value: "Female",
        label: "Female",
    },
    {
        value: "Diverse",
        label: "Diverse",
    },
];

const languages = [
    {
        value: "Arabic",
        label: "Arabic",
    },
    {
        value: "Bulgarian",
        label: "Bulgarian",
    },
    {
        value: "Burmese",
        label: "Burmese",
    },
    {
        value: "Chinese",
        label: "Chinese",
    },
    {
        value: "Croatian",
        label: "Croatian",
    },
    {
        value: "Danish",
        label: "Danish",
    },
    {
        value: "English",
        label: "English",
    },
    {
        value: "French",
        label: "French",
    },
    {
        value: "German",
        label: "German",
    },
    {
        value: "Hebrew",
        label: "Hebrew",
    },
    {
        value: "Hindi",
        label: "Hindi",
    },
    {
        value: "Italian",
        label: "Italian",
    },
    {
        value: "Japanese",
        label: "Japanese",
    },
    {
        value: "Korean",
        label: "Korean",
    },
    {
        value: "Kurdish",
        label: "Kurdish",
    },
    {
        value: "Latin",
        label: "Latin",
    },
    {
        value: "Norwegian",
        label: "Norwegian",
    },
    {
        value: "Polish",
        label: "Polish",
    },
    {
        value: "Portuguese",
        label: "Portuguese",
    },
    {
        value: "Russian",
        label: "Russian",
    },
    {
        value: "Swedish",
        label: "Swedish",
    },
    {
        value: "Thai",
        label: "Thai",
    },
    {
        value: "Tagalog",
        label: "Tagalog",
    },
    {
        value: "Turkish",
        label: "Turkish",
    },
    {
        value: "Ukrainian",
        label: "Ukrainian",
    },
    {
        value: "Vietnamese",
        label: "Vietnamese",
    },
    {
        value: "Yiddish",
        label: "Yiddish",
    },
    {
        value: "Others",
        label: "Others",
    },
];

const UploadButton = styled(Button)(({ theme }) => ({
    width: 36,
    height: 36,
    minWidth: 36,
    minHeight: 36,
    padding: 0,
    margin: 0,
    borderRadius: `50%`,
}));

export default function ProfileForm(props) {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [language, setLanguage] = useState([]);
    // const [visitedCountries, setVisitedCountries] = useState([]);
    const [introduction, setIntroduction] = useState("");
    const [profileImg, setProfileImg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = { name, city, country, age, gender, language, introduction, profileImg };

        service
            .put("/profile", requestBody)
            .then((response) => {
                navigate("/profile/me");
            })
            .catch((err) => {
                const errorDescription = err.response.data.message;
                setErrorMessage(errorDescription);
            });
    };

    const handleName = (e) => setName(e.target.value);
    const handleCountry = (e) => setCountry(e.target.value);
    const handleCity = (e) => setCity(e.target.value);
    const handleAge = (e) => setAge(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleIntroduction = (e) => setIntroduction(e.target.value);
    const handleLanguage = (event) => {
        const {
            target: { value },
        } = event;
        setLanguage(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleAvatar = (e) => {
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
            const data = upload.target.result;

            setProfileImg(data);
        };

        fileReader.readAsDataURL(file);
    };

    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        service
            .get("/profile/me")
            .then(({ data: profile }) => {
                setName(profile.name);
                setCountry(profile.country);
                setCity(profile.city);
                setAge(profile.age);
                setGender(profile.gender);
                setLanguage(profile.language);
                setIntroduction(profile.introduction);
                setProfileImg(profile.profileImg);
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
                <Badge
                    overlap='circular'
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                        <UploadButton variant='contained' component='label' sx={{ left: -6, top: -6 }}>
                            <AddPhotoAlternateIcon fontSize='small' />
                            <input accept='image/*' type='file' hidden onChange={handleAvatar} />
                        </UploadButton>
                    }
                >
                    <CloudinaryAvatar alt={name} src={profileImg} width={150} height={150} />
                </Badge>
                <Typography component='h1' variant='h5'>
                    My Profile
                </Typography>

                <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField name='name' required fullWidth id='name' label='Name' autoFocus type='text' value={name} onChange={handleName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id='country' select required fullWidth label='Country' value={country} onChange={handleCountry}>
                                {countries.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id='city' select required fullWidth label='City' value={city} onChange={handleCity}>
                                {cities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id='age'
                                fullWidth
                                label='Age'
                                type='number'
                                value={age}
                                onChange={handleAge}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    inputProps: { min: 0 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id='gender' select fullWidth label='Gender' value={gender} onChange={handleGender}>
                                {genders.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* https://mui.com/components/selects/ */}
                            {/* <FormControl sx={{ m: 1, width: 195, mt: 1 }}> */}
                            <InputLabel id='demo-multiple-checkbox-label'>Spoken Languages</InputLabel>
                            <Select labelId='demo-multiple-checkbox-label' id='demo-multiple-checkbox' multiple value={language} onChange={handleLanguage} renderValue={(selected) => selected.join(", ")} MenuProps={{ PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 } } }}>
                                {languages.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <Checkbox checked={language.indexOf(option.value) > -1} />
                                        <ListItemText primary={option.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* </FormControl> */}
                        </Grid>
                        {/* https://codesandbox.io/s/givp5 */}
                        <Grid item xs={12}>
                            <TextField id='introduction' fullWidth multiline rows={3} variant='outlined' label='More Information' helperText='Let the others travellers know more about you' value={introduction} onChange={handleIntroduction} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button href='/profile/me' fullWidth variant='outlined' sx={{ mt: 3, mb: 2, py: 1 }} startIcon={<BackspaceIcon />}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, py: 1 }} endIcon={<SaveOutlinedIcon />}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    {errorMessage && <h5>{errorMessage}</h5>}
                </Box>
            </Box>
        </Container>
    );
}
