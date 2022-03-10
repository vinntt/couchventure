// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Search from "../components/Search";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import service from "../api/service";
import CloudinaryAvatar from "../components/UI/CloudinaryAvatar";
import { Button } from "@mui/material";

export default function SearchPage() {
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid container xs={12}>
                    <Button href='/profile/me/couch' type='submit' variant='outlined' sx={{ mt: 8, ml: 10, mb: 1, py: 1, mr: 1 }}>
                        Hosts
                    </Button>
                    <Button type='submit' variant='outlined' sx={{ mt: 8, mb: 1, py: 1 }}>
                        Travellers
                    </Button>
                </Grid>

                <Grid item xs={6} md={4}>
                    <Search />
                </Grid>
                {/* <Grid container spacing={3}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid> */}
                {/* <Grid container spacing={3}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid> */}
            </Grid>
        </Container>
    );
}
