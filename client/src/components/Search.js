// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import service from '../api/service';
import CloudinaryAvatar from '../components/UI/CloudinaryAvatar';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Button, Typography, Skeleton, CardActionArea } from '@mui/material';


export default function Search() {
    const [mainFeaturedPost, setMainFeaturedPost] = useState('')
    const [name, setName] = useState(undefined)
    const [profileImg, setProfileImg] = useState(undefined);

    return (
        <article>
            <Container maxWidth="lg">
            <Card elevation={1} sx={{ maxWidth: 330, textAlign: 'center', marginTop: 6 }}>
                <CardActionArea>
                    <br/>
                    {typeof profileImg !== "undefined" ? (
                        <CloudinaryAvatar alt={name} src={profileImg} width={150} height={150} />
                    ) : (
                        <Skeleton variant="circular" width={150} height={150} sx={{margin: '0 auto'}} />
                    )}
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="black">
                            {/* {city}, {country} */}
                        </Typography>
                        {/* <Typography variant="h5" color={status === "Available To Host" ? "green" : "orange"}> */}
                            {/* <strong> {status} </strong> */}
                        {/* </Typography> */}
                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>

                </CardActions>
            </Card>
            </Container>
            <Footer />
        </article>
    );
}
