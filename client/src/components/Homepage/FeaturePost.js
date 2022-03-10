// https://codesandbox.io/s/50l225l964?file=/src/index.js

import { Avatar, AvatarGroup, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";

export default function FeaturedPost(props) {
    const { post } = props;

    return (
        <Grid item xs={12} md={4}>
            <CardActionArea component='a' href={post.href}>
                <Card>
                    <CardMedia component='img' height='207' image={post.image} />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant='h6' gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant='subtitle2' paragraph sx={{ fontWeight: 400 }}>
                            {post.description}
                        </Typography>
                        <AvatarGroup total={19} max={10}>
                            {post.avatars.map((avatar, idx) => (
                                <Avatar key={`feature-avatar-${idx}`} alt='' src={avatar} />
                            ))}
                        </AvatarGroup>
                        <Grid item sx={{ mt: 4, textAlign: "center" }}>
                            <Button variant='outlined' disabled={post.buttonDisabled}>
                                {post.buttonLabel}
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

FeaturedPost.propTypes = {
    post: PropTypes.shape({
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};
