import SendIcon from "@mui/icons-material/Send";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateRangePicker from "@mui/lab/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../api/service";

export default function InboxRequestForm(props) {
    const recipientId = props.recipientId;
    const [request, setRequest] = useState(undefined);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleOfferOrRequestSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
            numberOfPeople,
            content,
        };

        service.post(`/inbox/${recipientId}/request`, requestBody)
            .then(() => {
                navigate("/profile/me");
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    };

    const handleNumberOfPeople = (e) => setNumberOfPeople(e.target.value);
    const handleContent = (e) => setContent(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleDuration = (stayDuration) => {
        setStartDate(stayDuration[0]);
        setEndDate(stayDuration[1]);
    };

    useEffect(() => {
        service
            .get(`/profile/${recipientId}/request`)
            .then(({ data: trip }) => {
                setStartDate(trip.startDate);
                setEndDate(trip.endDate);
                setNumberOfPeople(trip.numberOfPeople);
                setContent(trip.content);
            })
            .catch((err) => {
                if (!err.response || err.response.status !== 404) {
                    setErrorMessage(err.response.data.message);
                    return
                }

                setRequest(false);
            });
    }, [recipientId]);

    if (typeof request === "undefined") {
        return <></>;
    }

    return (
        <Container maxWidth='md' disableGutters>
            <Accordion expanded disableGutters>
                <AccordionSummary sx={{ margin: 0 }}>
                    <Grid container direction='row' alignItems='center'>
                        <Typography
                            variant='h6'
                            // gutterBottom
                            // sx={{ marginTop: "10px", marginLeft: "0", padding: "0" }}
                        >
                            Request to stay with this host
                        </Typography>
                    </Grid>
                </AccordionSummary>
                <Divider textAlign='left'></Divider>
                <AccordionDetails sx={{ mt: 2 }}>
                    {request !== false ? (
                        <>Hehe</>
                    ) : (
                        <Box component='form' onSubmit={handleOfferOrRequestSubmit}>
                            <Grid container spacing={2}>
                                {errorMessage && (
                                    <Grid item xs={12}>
                                        <Alert severity='error'>{errorMessage}</Alert>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    {/* https://stackoverflow.com/questions/69458279/module-not-found-cant-resolve-mui-lab-adapterdatefns */}
                                    {/* https://mui.com/components/date-range-picker/ */}
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateRangePicker
                                            startText='Check-in'
                                            endText='Check-out'
                                            required
                                            value={[startDate, endDate]}
                                            onChange={handleDuration}
                                            renderInput={(startProps, endProps) => (
                                                <Fragment>
                                                    <TextField {...startProps} />
                                                    <Box sx={{ mx: 2 }}> - </Box>
                                                    <TextField {...endProps} />
                                                </Fragment>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id='numberOfPeople'
                                        required
                                        fullWidth
                                        label='Number of Guests'
                                        type='number'
                                        value={numberOfPeople}
                                        onChange={handleNumberOfPeople}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            inputProps: { min: 0 },
                                        }}
                                        helperText='Maximum Accommodate'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField id='content' fullWidth multiline rows={3} variant='outlined' label='Message to your host' helperText='Decribe your travel plan to your future hosts' value={content} onChange={handleContent} />
                                </Grid>

                                <Grid item xs={12} sx={{ textAlign: "right" }}>
                                    <Button type='submit' variant='contained' endIcon={<SendIcon />}>
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}
