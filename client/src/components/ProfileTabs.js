import React from 'react'
import { Tabs, Tab, Box } from '@mui/material'

function LinkTab(props) {
    return (
        <Tab component="a" {...props} />
    );
}

export default function ProfileTabs(props) {
    const tabs = [
        {
            href: `/profile/${props.userId}`,
            text: "About me",
        },
        {
            href: `/profile/${props.userId}/couch`,
            text: "My Home",
        },
        {
            href: `/profile/${props.userId}/friends`,
            text: "Friends",
        },
        {
            href: `/profile/${props.userId}/references`,
            text: "References",
        },
    ];

    let activeTab = tabs.findIndex(tab => tab.href === window.location.pathname);

    if (activeTab < 0) {
        activeTab = 0;
    }

    return (
        <div>
            {/* https://mui.com/components/tabs/ */}
            {/* https://mui.com/components/tooltips/ */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    {tabs.map((tab, index) => (
                        <LinkTab key={`profile-${props.userId}-${index}`} href={tab.href} label={tab.text} style={{ color: "orange", textDecoration: "none" }} />
                    ))}
                </Tabs>
            </Box>
        </div>
    )
}
