import { Box, Card, Tab, Tabs } from "@mui/material";

function LinkTab(props) {
    return <Tab component='a' {...props} />;
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

    let activeTab = tabs.findIndex((tab, idx) => idx > 0 && window.location.pathname.includes(tab.href));

    if (activeTab < 0) {
        activeTab = 0;
    }

    return (
        <>
            {/* https://mui.com/components/tabs/ */}
            {/* https://mui.com/components/tooltips/ */}
            <Card elevation={1}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={activeTab} variant='scrollable' scrollButtons allowScrollButtonsMobile aria-label='scrollable force tabs example'>
                        {tabs.map((tab, index) => (
                            <LinkTab key={`profile-${props.userId}-${index}`} href={tab.href} label={tab.text} style={{ color: "#ff9800", textDecoration: "none" }} />
                        ))}
                    </Tabs>
                </Box>
            </Card>
        </>
    );
}
