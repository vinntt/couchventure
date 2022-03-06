
import { Typography, Grid, Button, Container, Divider, Chip } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SmsIcon from '@mui/icons-material/Sms';
import PushPinIcon from '@mui/icons-material/PushPin';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from "axios"
import { useEffect, useState } from "react"

export default function ProfileDetail(props) {
    const [profile, setProfile] = useState(undefined)
    const [age, setAge] = useState(undefined)
    const [gender, setGender] = useState(undefined)
    const [language, setLanguage] = useState(undefined)
    const [visitedCountries, setVisitedCountries] = useState(undefined);
    const [introduction, setIntroduction] = useState(undefined);

    useEffect(() => {
        axios.get(`http://localhost:5005/profile/${props.userId}`)
            .then(response => {
                setProfile(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.userId]);

    return (
        <div>
            {profile &&
                // https://mui.com/api/container/
                <Container maxWidth="md">
                    {/* <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                    About Me */}
                    <Divider>
                        <Chip label="About Me" sx={{ fontSize: 50, width: "250px", height: "80px" }} />
                    </Divider>
                    {/* </Typography> */}
                    <Grid container direction="row" alignItems="center">
                        <AccessibilityNewIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
                            Age, Gender 31, Female
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <SmsIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
                            Fluent in English, Ukrainian; learning German
                        </Typography>
                    </Grid>
                    {/* <Grid container direction="row" alignItems="center">
                        <PushPinIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
                            From Ukrainka, Kyiv, Ukraine
                        </Typography>
                    </Grid> */}
                    <Grid container direction="row" alignItems="center">
                        <TravelExploreIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
                            visitedCountries - Austria, Germany, Ukraine
                        </Typography>
                    </Grid>
                    <Typography variant="h6" align="jutify" color="text.secondary" paragraph>
                        Introduction - I'm a newbie
                    </Typography>
                    <Grid item xs={12} >
					<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, py: 2 }} endIcon={<EditOutlinedIcon />}>
						Edit
					</Button>
				</Grid>
                </Container>
            }
        </div>
    )
}
