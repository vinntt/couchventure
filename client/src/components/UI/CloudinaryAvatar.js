import React from 'react'
import { Avatar } from '@mui/material';
import cloudinaryResize from '../../utils/cloudinary'

export default function CloudinaryAvatar(props) {
    const transform = props.transform || 'c_fill';

    return (
        <Avatar
            alt={props.name}
            src={cloudinaryResize(props.src, `${transform},w_${props.width},h_${props.height}`)}
            sx={{ width: props.width | 0, height: props.height | 0, margin: "0 auto" }}
        />
    )
}
