import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Avatar, Button } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import EmailIcon from '@mui/icons-material/Email';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GradeIcon from '@mui/icons-material/Grade';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';

// https://codesandbox.io/s/tvkhzf?file=/demo.js:1909-2208
const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


export default function ProfileCardSideFeature(props) {
    const [name, setName] = useState(undefined)
    const [city, setCity] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [status, setStatus] = useState(undefined);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        axios.get(`http://localhost:5005/profile/${props.userId}`)
            .then(response => {
                console.log(response)
                setName(response.data.name)
                setCity(response.data.city)
                setCountry(response.data.country)
                // setStatus(response.data.status)
                setStatus(() => {
                    if (response.data.status === 'availableToHost') {
                        return 'Available To Host'
                    }
                    if (response.data.status === 'iAmBusy') {
                        return 'I am Busy'
                    }
                    if (response.data.status === 'mayBeAcceptingGuests') {
                        return 'Maybe Accepting Guests'
                    }
                })
            }
            )
            .catch(err => console.log(err))
    }, [props.userId])

    return (
        <>
            <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
                <CardActionArea>
                    <Avatar
                        alt={name}
                        // src="/static/images/avatar/1.jpg"
                        sx={{ width: 150, height: 150, margin: "0 auto" }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body1" color="black">
                            {city}, {country}
                        </Typography>
                        <Typography variant="h5" color="orange">
                            <strong> {status} </strong>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 2 }}
                        endIcon={<ChairOutlinedIcon
                        />}
                    >
                        Send Request
                    </Button >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 2 }}
                        onClick={handleClick}
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        disableElevation
                        // variant="contained"
                        endIcon={<ArrowDropDownOutlinedIcon />}>
                        Options
                    </Button >
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} disableRipple>
                            <GroupAddIcon />
                            Add Friend
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <EmailIcon />
                            Send Message
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <GradeIcon />
                            Write Reference
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <ReportProblemOutlinedIcon />
                            Report
                        </MenuItem>
                    </StyledMenu>
                </CardActions>
            </Card>
        </>
    );
}
