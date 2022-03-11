import React from 'react'
import { Avatar } from '@mui/material';
import cloudinaryResize from '../../utils/cloudinary'

export default function CloudinaryAvatar(props) {
    const transform = props.transform || 'c_fill';
    const variant = props.variant || "circular";

    return (
        <Avatar
            variant={variant}
            alt={props.name}
            src={cloudinaryResize(props.src, `${transform},w_${props.width * 2},h_${props.height * 2}`)}
            sx={{ width: props.width | 0, height: props.height | 0, margin: "0 auto" }}
        />
    )
}
