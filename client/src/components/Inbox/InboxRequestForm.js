import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SendIcon from "@mui/icons-material/Send";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
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

const SEND_REQUEST_PANEL_TITLE = "Request to stay with this host";
const RECEIVE_REQUEST_PANEL_TITLE = "You received a request";

export default function InboxRequestForm(props) {
    const recipientId = props.recipientId;
    const onCancel = props.onCancel || (() => {});
    const onRequest = props.onRequest || (() => {});

    const [request, setRequest] = useState(undefined);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [content, setContent] = useState("");
    const [panelTitle, setPanelTitle] = useState(SEND_REQUEST_PANEL_TITLE);
    const [cancelActionText, setCancelActionText] = useState("");
    const [cancelReason, setCancelReason] = useState("REQUEST_CANCEL");

    const handleOfferOrRequestSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
            numberOfPeople,
            content,
        };

        service
            .post(`/inbox/${recipientId}/request`, requestBody)
            .then(() => {
                setStartDate(null);
                setEndDate(null);
                setNumberOfPeople("");
                setContent("");
                getRequest();
                onRequest();
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    };

    const cancelRequest = () => {
        service
            .delete(`/inbox/${recipientId}/request`, { data: { reason: cancelReason } })
            .then(onCancel)
            .catch((err) => {
                setErrorMessage(err.response.data.message);
            });
    };

    const getRequest = () => {
        service
            .get(`/inbox/${recipientId}/request`)
            .then(({ data: request }) => {
                setRequest(request);

                if (request.creator === recipientId) {
                    // Offer
                    setPanelTitle(RECEIVE_REQUEST_PANEL_TITLE);
                    setCancelReason("REQUEST_DECLINE");
                    setCancelActionText("Decline");
                } else {
                    if (request.host === recipientId) {
                        setPanelTitle(SEND_REQUEST_PANEL_TITLE);
                        setCancelReason("REQUEST_CANCEL");
                        setCancelActionText("Cancel");
                    } else {
                        setPanelTitle(RECEIVE_REQUEST_PANEL_TITLE);
                        setCancelReason("REQUEST_CANCEL");
                        setCancelActionText("Decline");
                    }
                }
            })
            .catch((err) => {
                if (!err.response || err.response.status !== 404) {
                    setErrorMessage(err.response.data.message);
                    return;
                }

                setPanelTitle(SEND_REQUEST_PANEL_TITLE);
                setCancelReason("REQUEST_CANCEL");
                setCancelActionText("Cancel");
                setRequest(false);
            });
    };

    const handleNumberOfPeople = (e) => setNumberOfPeople(e.target.value);
    const handleContent = (e) => setContent(e.target.value);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleDuration = (stayDuration) => {
        setStartDate(stayDuration[0]);
        setEndDate(stayDuration[1]);
    };

    useEffect(getRequest, [recipientId, props.timestamp]);

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
                            {panelTitle}
                        </Typography>
                    </Grid>
                    {request !== false && (
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            <Button color='error' onClick={cancelRequest}>
                                {cancelActionText}
                            </Button>
                        </Grid>
                    )}
                </AccordionSummary>
                <Divider textAlign='left'></Divider>
                <AccordionDetails sx={{ mt: 2 }}>
                    {request !== false ? (
                        <Box>
                            {errorMessage && (
                                <Grid item xs={12}>
                                    <Alert severity='error'>{errorMessage}</Alert>
                                </Grid>
                            )}
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <PeopleAltOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    {request.numberOfPeople} Travellers
                                </Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center' sx={{ mb: 1 }}>
                                <EventOutlinedIcon sx={{ mr: 1 }} color='disabled' fontSize='small' />
                                <Typography align='justify' color='text.secondary'>
                                    {moment(request.startDate).format("YYYY-MM-DD")}
                                </Typography>
                                <ArrowForwardIcon fontSize='12' />
                                <Typography align='justify' color='text.secondary'>
                                    {moment(request.endDate).format("YYYY-MM-DD")}
                                </Typography>
                            </Grid>
                            <Typography align='justify' color='text.secondary' paragraph>
                                {request.content}
                            </Typography>
                        </Box>
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
