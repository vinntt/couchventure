// https://codesandbox.io/s/50l225l964?file=/src/index.js

import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// https://mui.com/guides/migration-v4/
import { withStyles, Avatar } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Divider } from '@mui/material';

export default function FeaturedPost(props) {

  return (
    <Grid item xs={12} md={4} >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" sx={{ textAlign: "center"}}>
              {/* {props.title} */}
              Local Hosts
            </Typography>
            <Divider variant="middle" sx={{ m: 1.5}} />
            <Typography variant="subtitle1" paragraph>
              {/* {props.description} */}
              'Stay with the local host in your upcoming trips'
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={props.image}
            alt={props.imageLabel}
          /> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
