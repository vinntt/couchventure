import SendIcon from "@mui/icons-material/Send";
import { Alert, Button, Card, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useReducer, useState } from "react";
import service from "../../api/service";
import CloudinaryAvatar from "../UI/CloudinaryAvatar";

export default function InboxMessageList(props) {
    const [messages, setMessages] = useState(undefined);
    const [messageContent, setMessageContent] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const sendMessage = (e) => {
        e.preventDefault();

        if (messageContent.trim() === "") {
            setErrorMessage("Message is empty");
            return;
        }

        service
            .post(`/inbox/${props.recipientId}`, { content: messageContent })
            .then(() => {
                setMessageContent("");
                getMessages();
            })
            .catch((error) => setErrorMessage(error.response.data.message));
    };

    const getMessages = () => {
        service
            .get(`/inbox/${props.recipientId}`)
            .then(({ data: messages }) => {
                setMessages(messages);
            })
            .catch((error) => {
                if (!error.response || !error.response.data.message) {
                    setErrorMessage("Could not get message, please refresh");
                }

                setErrorMessage(error.response.data.message);
            });
    };

    const handleMessageContent = (e) => setMessageContent(e.target.value);

    useEffect(() => getMessages(), [props.recipientId]);

    return (
        <Container maxWidth='lg' disableGutters sx={{ mt: 2 }}>
            <Card>
                <Box component='form' onSubmit={sendMessage} sx={{ p: 2, mb: 2, backgroundColor: "#f5f5f5" }}>
                    <Grid container spacing={2}>
                        {errorMessage && (
                            <Grid item xs={12}>
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField id='content' required fullWidth multiline rows={3} variant='outlined' label='Message' value={messageContent} onChange={handleMessageContent} sx={{backgroundColor: '#fff'}} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' endIcon={<SendIcon />}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <List sx={{ width: "100%" }}>
                    {messages &&
                        messages.map(({ sender, title, content, createdAt }, idx) => {
                            const ownMessage = props.recipientId !== sender.id;
                            const listItemStyle = { gap: 0, alignItems: "flex-end", justifyContent: "flex-start", flexDirection: ownMessage ? "row-reverse" : "row" };
                            const timestampAlign = ownMessage ? "right" : "left";
                            const timestampPL = ownMessage ? 0 : 2;
                            const timestampPR = ownMessage ? 2 : 0;

                            return (
                                <ListItem key={`message-${props.recipientId}-${idx}`} sx={listItemStyle}>
                                    <ListItemAvatar>
                                        <CloudinaryAvatar name={sender.name} src={sender.profileImg} width={50} height={50} />
                                    </ListItemAvatar>
                                    <Box sx={{ maxWidth: "45%", mb: 3 }}>
                                        <ListItemText
                                            primary={
                                                <Typography component='span' variant='body2'>
                                                    <strong>{title}</strong>
                                                </Typography>
                                            }
                                            secondary={
                                                <Box>
                                                    <Typography component='span' variant='body2'>
                                                        {content}
                                                    </Typography>
                                                </Box>
                                            }
                                            sx={{ backgroundColor: ownMessage ? "#b3e5fc" : "#f5f5f5", m: 0, pt: 1, pb: 1, pl: 2, pr: 2, borderRadius: 5 }}
                                        />
                                        <Typography variant='caption' paragraph sx={{ m: 0, textAlign: timestampAlign, fontSize: 11, color: "#9e9e9e", pl: timestampPL, pr: timestampPR }}>
                                            {createdAt}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            );
                        })}
                </List>
            </Card>
        </Container>
    );
}
