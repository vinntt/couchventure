// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainFeaturedPost from '../components/Homepage/MainFeaturePost';
import FeaturedPost from '../components/Homepage/FeaturePost';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import service from '../api/service';
import CloudinaryAvatar from '../components/UI/CloudinaryAvatar';


export default function Homepage(props) {
    const [mainFeaturedPost, setMainFeaturedPost] = useState('')
    const [name, setName] = useState(undefined)
    const [profileImg, setProfileImg] = useState(undefined);

    // Setup for the main feature post
    useEffect(() => {
        axios.get(`https://api.quotable.io/random?tags=life&minLength=120`)
            .then(quote => {
                const newMainFeaturedPost = {
                    quote: quote.data.content,
                    author: quote.data.author,
                    randomFeatureImage: "https://source.unsplash.com/random/?travel",
                    imageText: 'Random Travel Images Background'
                };
                // const interval = setInterval(() => {
                //     setMainFeaturedPost(newMainFeaturedPost);
                //   }, 1000);
                //   return () => clearInterval(interval);
                setMainFeaturedPost(newMainFeaturedPost);
            })
            .catch(err => console.log(err))
    }, [])

    // Setup for the 3 side feature posts
    useEffect(() => {
        service.get(`/profile/${props.userId}`)
            .then(({ data: profile }) => {
                // console.log(profile)
                if (profile.status === 'Available To Host' || profile.status === 'May Be Accepting Guests' & profile._id !== {}) {
                    setProfileImg(profile.profileImg)
                    setName(profile.name)
                } else {
                    setProfileImg(false)
                    setName(false)
                }
            })
            .catch(err => console.log(err))
    }, [props.userId])

    const featuredPosts = [
        {
            title: 'Local Hosts',
            description:
                'Stay with the local host in your upcoming trips',
            image: 'https://source.unsplash.com/random',
            imageLabel: 'User"s icons',
        },
        {
            title: 'Upcoming Visitors',
            description:
                'Meet or Host the upcoming visitors in your city',
            image: 'https://source.unsplash.com/random',
            imageLabel: 'User"s icons',
        },
        {
            title: 'Hangouts',
            description:
                'Some nearby members are available to meet now',
            image: 'https://source.unsplash.com/random',
            imageLabel: 'User"s icons',
        },
    ];


        return (
            <article>
                <Container maxWidth="lg">
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={3}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                </Container>
                <Footer />
            </article>
        );
    }
