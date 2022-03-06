
import { Typography, Grid, Button, Container, Divider, Chip } from '@mui/material';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import DirectionsTransitOutlinedIcon from '@mui/icons-material/DirectionsTransitOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from "axios"
import { useEffect, useState } from "react"

export default function CouchPage(props) {
    const [couch, setCouch] = useState(undefined)

    useEffect(() => {
        axios.get(`http://localhost:5005/profile/${props.userId}`)
            .then(response => {
                setCouch(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.userId]);

    return (
        <div>
            {couch &&
                // <div>
                //     {profile.name}<br />{profile.country}
                // </div>
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
                        <Chip label="My Home" sx={{ fontSize: 50, width: "250px", height: "80px" }} />
                    </Divider>
                    {/* </Typography> */}
                    <Grid container direction="row" alignItems="center">
                        <EmojiPeopleOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						Max Number of Guests: 1
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <ChildCareOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						Kid Friendly?
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center">
                        <PetsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						Pet Friendly?
                        </Typography>
                    </Grid>
					<Grid container direction="row" alignItems="center">
                        <SmokingRoomsOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						Smoking Allowed?
                        </Typography>
                    </Grid>
					<Grid container direction="row" alignItems="center">
                        <AccessibleOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						Wheelchair Accessible?
                        </Typography>
                    </Grid>
					<Grid container direction="row" alignItems="center">
                        <BedroomChildOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						SLEEPING ARRANGEMENTS
                        </Typography>
                    </Grid>
					<Grid container direction="row" alignItems="center">
                        <LocationCityOutlinedIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" align="jutify" color="text.secondary">
						distance to city center
                        </Typography>
                    </Grid>
                    <Typography variant="h6" align="jutify" color="text.secondary" paragraph>
					description
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
