import React from 'react'
import { Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'

export default function ProfileTabs() {


    return (
        <div>
            {/* https://mui.com/components/tabs/ */}
            <Tabs
                //   value={value}
                //   onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                >
                <Link to='/'>
                <Tab label="About Me" />
                </Link>
                <Link to='/'>
                <Tab label="My Home" />
                </Link>
                <Link to='/'>
                <Tab label="Photos" />
                </Link>
                <Link to='/'>
                <Tab label="References" />
                </Link>
                <Link to='/'>
                <Tab label="Friends" />
                </Link>
                <Link to='/'>
                <Tab label="Favourites" />
                </Link>
            </Tabs>
        </div>
    )
}
