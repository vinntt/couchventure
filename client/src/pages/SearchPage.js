// https://mui.com/getting-started/templates/
// https://mui.com/getting-started/templates/blog/
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import service from "../api/service";
import Search from "../components/Search";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState("host");

    const setType = (type) => {
        searchParams.set("type", type);

        navigate("/search?" + searchParams.toString());
    };

    useEffect(() => {
        const params = { city: "", country: "" };
        const keyword = searchParams.get("q");
        let type = searchParams.get("type");

        if (keyword && keyword !== "") {
            const [city, country] = keyword.split(", ");

            params.city = city;
            params.country = country;
        }

        if (!type || type !== "traveler") {
            type = "host";
        }

        setSearchType(type);

        service
            .get(`/search/host?` + createSearchParams(params).toString())
            // .get(`/search/${type}?` + createSearchParams(params).toString())
            .then(({ data: results }) => setSearchResults(results))
            .catch((error) => console.log(error));
    }, [window.location.search]);

    return (
        <Container maxWidth='lg'>
            <Grid container>
                <Button onClick={() => setType("host")} variant='outlined' sx={{ mt: 8, ml: 10, mb: 1, py: 1, mr: 1 }}>
                    Hosts
                </Button>
                <Button onClick={() => setType("traveler")} variant='outlined' sx={{ mt: 8, mb: 1, py: 1 }}>
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
