// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedPost from "../components/Homepage/FeaturePost";
import MainFeaturedPost from "../components/Homepage/MainFeaturePost";

export default function Homepage(props) {
    const [mainFeaturedPost, setMainFeaturedPost] = useState("");

    // Setup for the main feature post
    useEffect(() => {
        axios
            .get(`https://api.quotable.io/random?tags=life&minLength=120`)
            .then((quote) => {
                setMainFeaturedPost({
                    quote: quote.data.content,
                    author: quote.data.author,
                    randomFeatureImage: "https://source.unsplash.com/random/?travel&orientation=landscape",
                    imageText: "Random Travel Images Background",
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const featuredPosts = [
        {
            title: "Local Hosts",
            description: "Stay with the local host in your upcoming trips",
            image: "https://source.unsplash.com/random/368x207?travel,1&orientation=landscape",
            avatars: ["https://source.unsplash.com/random/50x50?face,1", "https://source.unsplash.com/random/50x50?face,2", "https://source.unsplash.com/random/50x50?face,3", "https://source.unsplash.com/random/50x50?face,4", "https://source.unsplash.com/random/50x50?face,5"],
            buttonLabel: "Find a Host",
            buttonDisabled: false,
            href: "/search?type=host",
        },
        {
            title: "Upcoming Visitors",
            description: "Meet or Host the upcoming visitors in your city",
            image: "https://source.unsplash.com/random/368x207?travel,2&orientation=landscape",
            avatars: ["https://source.unsplash.com/random/50x50?face,6", "https://source.unsplash.com/random/50x50?face,7", "https://source.unsplash.com/random/50x50?face,8", "https://source.unsplash.com/random/50x50?face,9", "https://source.unsplash.com/random/50x50?face,10", "https://source.unsplash.com/random/50x50?face,11"],
            buttonLabel: "Meet Travelers",
            buttonDisabled: false,
            href: "/search?type=traveler",
        },
        {
            title: "Hangouts",
            description: "Some nearby members are available to meet now",
            image: "https://source.unsplash.com/random/368x207?travel3,&orientation=landscape",
            avatars: ["https://source.unsplash.com/random/50x50?face,12", "https://source.unsplash.com/random/50x50?face,13", "https://source.unsplash.com/random/50x50?face,14", "https://source.unsplash.com/random/50x50?face,15", "https://source.unsplash.com/random/50x50?face,16"],
            buttonLabel: "Coming Soon!",
            buttonDisabled: true,
            href: "#",
        },
    ];

    return (
        <article>
            <Container maxWidth='lg'>
                <MainFeaturedPost post={mainFeaturedPost} />
                <Grid container spacing={3}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>
            </Container>
        </article>
    );
}
