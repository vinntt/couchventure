import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import { createSearchParams, Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { Autocomplete, Container, createFilterOptions, Input, TextField } from "@mui/material";
import SearchAutocomplete from "./SearchAutocomplete";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    // background: "red",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    color: "inherit",
    // background: "red",
    "& .MuiOutlinedInput-root": {
        padding: 0,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("md")]: {
            width: "30ch",
        },
        "& fieldset": {
            border: 0,
            "&:hover": {
                border: 0,
            },
        },
    },
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        color: "#fff",
    },
}));

const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => `${option.city}, ${option.country}`,
});

const locationOptions = [
    {
        city: "Berlin",
        country: "Germany",
    },
    {
        city: "Frankfurt",
        country: "Germany",
    },
    {
        city: "Hamburg",
        country: "Germany",
    },
    {
        city: "Munich",
        country: "Germany",
    },
    {
        city: "Others",
        country: "Germany",
    },
];

export default function Navbar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { logoutUser } = useContext(AuthContext);
    // const [search, setSearch] = useState('')
    const [searchOption, setSearchOption] = useState(null);
    const [searchOptionText, setSearchOptionText] = useState("");

    // console.log(searchParams.get("q"));

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleSettingsMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const setKeyword = (keyword) => {
        if (keyword && keyword !== "") {
            const [city, country] = keyword.split(", ");

            setSearchOption({ city, country });
            setSearchOptionText(`${city}, ${country}`);
        } else {
            setSearchOption(null);
            setSearchOptionText("");
        }
    };

    const handleLocationChange = (e, value) => {
        if (!value) {
            navigate(`/search`);
            return;
        }

        const params = createSearchParams({ q: `${value.city}, ${value.country}` }).toString();

        navigate(`/search?${params}`);
    };

    useEffect(() => {
        setKeyword(searchParams.get("q"));
    }, [window.location.search]);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Account & Settings</MenuItem>
            <MenuItem onClick={logoutUser}>Log Out</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size='small' aria-label='show dashboard' color='inherit'>
                    <Badge color='error'>
                        <DashboardOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Dashboard</p>
            </MenuItem>
            <MenuItem>
                <IconButton size='small' aria-label='show event' color='inherit'>
                    <Badge color='error'>
                        <DateRangeOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Events</p>
            </MenuItem>
            <MenuItem>
                <IconButton size='small' aria-label='show 4 new messages' color='inherit'>
                    <Badge badgeContent={4} color='error'>
                        <MailOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton size='small' aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={handleSettingsMenuOpen}>
                <IconButton size='small' aria-label='account of current user' aria-controls='primary-search-account-menu' aria-haspopup='true' color='inherit'>
                    <SettingsIcon />
                </IconButton>
                <p>Settings</p>
            </MenuItem>
        </Menu>
    );

    return (
        // https://codesandbox.io/s/hisnxi?file=/demo.js
        // https://codesandbox.io/s/kzp5wkypx?file=/index.js
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Link to='/' style={{ color: "white", textDecoration: "none" }}>
                            <Typography variant='h6' noWrap component='div' sx={{ display: { xs: "none", sm: "block" } }}>
                                Couchventure
                            </Typography>
                        </Link>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <Autocomplete
                                value={searchOption}
                                inputValue={searchOptionText}
                                options={locationOptions}
                                getOptionLabel={(option) => `${option.city}, ${option.country}`}
                                isOptionEqualToValue={(option, value) => option.city === value.city && option.country === value.country}
                                filterOptions={filterOptions}
                                clearIcon={<ClearIcon fontSize="small" sx={{ color: '#fff' }} />}
                                popupIcon={null}
                                renderInput={(params) => <StyledTextField {...params} placeholder='Search…' />}
                                onChange={handleLocationChange}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <Link to='/' style={{ textDecoration: "none" }}>
                                <IconButton size='small' style={{ color: "white", padding: "10px 8px" }}>
                                    <DashboardOutlinedIcon sx={{ fontSize: 24 }} />
                                </IconButton>
                            </Link>
                            <Link to='/' style={{ textDecoration: "none" }}>
                                <IconButton size='small' style={{ color: "white", padding: "10px 8px" }}>
                                    <DateRangeOutlinedIcon sx={{ fontSize: 24 }} />
                                </IconButton>
                            </Link>
                            <Link to='/' style={{ textDecoration: "none" }}>
                                <IconButton size='small' aria-label='show 4 new mails' style={{ color: "white", padding: "10px 8px" }}>
                                    <Badge badgeContent={4} color='error'>
                                        <MailOutlinedIcon sx={{ fontSize: 24 }} />
                                    </Badge>
                                </IconButton>
                            </Link>

                            <Link to='/profile/me' style={{ textDecoration: "none" }}>
                                <IconButton
                                    size='small'
                                    // aria-controls={menuId}
                                    // aria-haspopup="true"
                                    // onClick={handleSettingsMenuOpen}
                                    // style={{ color: "white", padding: "0", margin: "0" }}
                                    style={{ color: "white", padding: "10px 8px" }}
                                >
                                    <AccountCircle sx={{ fontSize: 24 }} />
                                </IconButton>
                            </Link>
                            {/* <Link to='#' style={{ textDecoration: "none" }}> */}
                                <IconButton size='small' aria-controls={menuId} aria-haspopup='true' onClick={handleSettingsMenuOpen} style={{ color: "white", padding: "10px 8px" }}>
                                    <SettingsIcon sx={{ fontSize: 24 }} />
                                </IconButton>
                            {/* </Link> */}
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton size='small' aria-label='show more' aria-controls={mobileMenuId} aria-haspopup='true' onClick={handleMobileMenuOpen} color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
