// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Search from '../components/Search';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import service from '../api/service';
import CloudinaryAvatar from '../components/UI/CloudinaryAvatar';


export default function SearchPage() {

    return (
        <>
            <Container maxWidth="lg">
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
            <Footer />
        </>
    );
}
