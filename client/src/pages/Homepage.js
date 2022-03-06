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

const featuredPosts = [
    {
        title: 'Local Hosts',
        description:
            'Stay with the local host in your upcoming trips',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Upcoming Visitors',
        description:
            'Meet or Host the upcoming visitors in your city',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Hangouts',
        description:
            'Some nearby members are available to meet now',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
];

function Homepage(props) {
    const [mainFeaturedPost, setMainFeaturedPost] = useState('')
    const [name, setName] = useState(undefined)

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

    useEffect(() => {
        axios.get(`http://localhost:5005/profile/${props.userId}`)
            .then(response => {
                console.log(response)
                // Promise.all([
                //     User.findById(req.params.id),
                //     Couch.findOne({ creator: req.params.id })
                // ])
                //     .then(([user, couch]) => {
                //         const { name, city, country, profileImg } = user
                //         let status = ""

                //         if (couch) {
                //             status = couch.status
                //         }

                //         res.status(200).json({ name, city, country, profileImg, status })
                    })
                    .catch(err => console.log(err))
            })


        return (
            <article>
                <Container maxWidth="lg">
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                        <Grid container spacing={3}>
                            {featuredPosts.map((post) => (
                                <FeaturedPost key={post.title} post={post} />
                            ))}
                            {/* <FeaturedPost /> */}
                        </Grid>
                    </main>
                </Container>
                <Footer />
            </article>
        );
    }

export default Homepage;
