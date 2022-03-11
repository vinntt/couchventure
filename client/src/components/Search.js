// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import * as React from "react";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
import service from "../api/service";
import CloudinaryAvatar from "./UI/CloudinaryAvatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChairIcon from "@mui/icons-material/Chair";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Card, Typography, Skeleton, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Search(props) {
    const { result } = props;
    const navigate = useNavigate();

    return (
        <Grid item md={4}>
            <Card elevation={1} sx={{ textAlign: "center", marginTop: 3, width: 350, maxWidth: 350, cursor: "pointer" }} onClick={() => navigate(`/profile/${result.id}`)}>
                <CardActionArea>
                    <Grid container rowSpacing={1} sx={{ pt: 1, pb: 1 }}>
                        <Grid item xs={12} sm={5}>
                            <CloudinaryAvatar alt={result.name} src={result.profileImg} width={130} height={130} />
                        </Grid>
                        <Grid item xs={12} sm={7} alignItems='left'>
                            <Typography gutterBottom variant='body1' color='grey' align='left' noWrap={true}>
                                <strong>{result.name}</strong>
                            </Typography>
                            <Grid container direction='row' alignItems='left' sx={{ mb: 1, pr: 2 }} wrap='nowrap'>
                                <LocationOnIcon fontSize='small' />
                                <Typography gutterBottom variant='caption' color='grey' noWrap={true} sx={{ ml: 0.5 }}>
                                    {result.city}, {result.country}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='left' sx={{ mb: 1, pr: 2 }} wrap='nowrap'>
                                <LanguageIcon fontSize='small' />
                                <Typography gutterBottom variant='caption' color='grey' noWrap={true} sx={{ ml: 0.5 }}>
                                    {result.language.join(", ")}
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='left' sx={{ mb: 1, pr: 2 }} wrap='nowrap'>
                                <ChairIcon fontSize='small' />
                                <Typography gutterBottom variant='caption' color='grey' noWrap={true} sx={{ ml: 0.5 }}>
                                    {result.status}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <Grid container direction='row' alignItems='left' sx={{ m: 1, maxHeight: 60, minHeight: 60, pr: 2 }} wrap='nowrap'>
                    <AccountCircleIcon fontSize='small' />
                    <Typography gutterBottom variant='caption' color='grey' sx={{ textAlign: "left", ml: 1, overflow: "hidden", display: '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical' }}>
                        {result.introduction}
                    </Typography>
                </Grid>
            </Card>
        </Grid>
    );
}
