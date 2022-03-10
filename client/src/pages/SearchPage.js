// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import service from "../api/service";
import Search from "../components/Search";

export default function SearchPage() {
    const [searchParams] = useSearchParams();

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const params = { city: '', country: '', type: '' };
        const keyword = searchParams.get('q');

        if (keyword && keyword !== "") {
            const [city, country] = keyword.split(", ");

            params.city = city;
            params.country = country;
        }

        service.get('/search?' + createSearchParams(params).toString())
            .then(({ data: results }) => setSearchResults(results))
            .catch(error => console.log(error));
    }, [searchParams]);

    // const searchResults = [
    //     {
    //         profileImg: "https://source.unsplash.com/random/50x50?face,1",
    //         name: "Local Hosts",
    //         location: "Stay with the local host in your upcoming trips",
    //         language: "English",
    //         status: "Available to Host",
    //         description: "Find a Host",
    //         buttonDisabled: false,
    //         href: "/search?type=host",
    //     },
    //     {
    //         profileImg: "https://source.unsplash.com/random/50x50?face,6",
    //         name: "Upcoming Visitors",
    //         location: "Meet or Host the upcoming visitors in your city",
    //         language: "German",
    //         status: "Maybe Accepting Guest",
    //         description: "Meet Travelers",
    //         buttonDisabled: false,
    //         href: "/search?type=traveler",
    //     },
    //     {
    //         // profileImg: "https://source.unsplash.com/random/50x50?face,12",
    //         profileImg: "",
    //         name: "Hangouts",
    //         location: "Some nearby members are available to meet now",
    //         language: "French",
    //         status: "I am Busy",
    //         description: "Coming Soon!",
    //         buttonDisabled: true,
    //         href: "#",
    //     },

    // ];

    return (
        <Container maxWidth='lg'>
            <Grid container>
                <Button href='/profile/me/couch' type='submit' variant='outlined' sx={{ mt: 8, ml: 10, mb: 1, py: 1, mr: 1 }}>
                    Hosts
                </Button>
                <Button type='submit' variant='outlined' sx={{ mt: 8, mb: 1, py: 1 }}>
                    Travellers
                </Button>
            </Grid>
            <Grid container spacing={3}>
                {searchResults.map((result, index) => (
                    <Search key={`result-${index}`} result={result} />
                ))}
            </Grid>
        </Container>
    );
}
