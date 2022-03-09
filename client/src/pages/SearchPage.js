// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Search from "../components/Search";

export default function SearchPage() {
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Search />
                </Grid>
                {/* <Grid container spacing={3}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid> */}
            </Grid>
        </Container>
    );
}
