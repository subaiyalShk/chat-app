import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Paper, Icon, Grid, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Card, CardContent, CardHeader, Button, Avatar, CssBaseline, TextField, Typography, Container } from '@material-ui/core'
import ScrollToBottom from 'react-scroll-to-bottom'
import FileUpload from '../components/FileUpload'

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    messagebox:{
        width:'70%',
        height:'100%'
    },
    chat:{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        height: '310px',
    },
    chatContainer:{
      
    },
    inputBox:{
        width:'100%'
    },
    inputPaper:{
        backgroundColor: '#BDBDBD',
    },
    input:{
        backgroundColor:'white'
    }
    }));

    export default function Imessenger(props) {
        const {messages, message, setMessage, sendMessage}=props
        const classes = useStyles();

    return (
        <div>
                <Grid 
                    container 
                    direction="row"
                    justify="center"
                    alignItems="center"
                    
                >
                    <Grid item xs={12} >
                        <Paper elevation={9} >
                            <List >
                                <ScrollToBottom className={classes.chat} >
                                {
                                    messages.map(message =>{
                                        return(
                                            <>
                                            <ListItem key={message} alignItems="center">
                                                <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={message.user}
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {message.text}
                                                    </Typography>

                                                    </React.Fragment>
                                                }
                                                />
                                            </ListItem>
                                            </>
                                        )
                                    })
                                }
                                </ScrollToBottom>
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={9} className={classes.inputPaper}>
                            <Grid container className={classes.inputBox} spacing={2}>
                                <Grid item xs={1}>
                                    <FileUpload/>
                                </Grid>
                                <Grid item xs={11} >
                                    <TextField
                                        className={classes.input}
                                        fullWidth
                                        value={message}
                                        variant="outlined"
                                        onChange={(e)=>setMessage(e.target.value)}
                                        onKeyDown={(e)=>e.keyCode===13?sendMessage(e):null}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
        </div>
    );
    }