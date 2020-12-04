import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {Paper, Icon, Grid, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Card, CardContent, CardHeader, Button, Avatar, CssBaseline, TextField, Typography, Container } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import FileUpload from '../components/FileUpload'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor:'#120B29',
        height:'100%'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    messagebox:{
        width:'70%',
        height:'100%'
    },
    chat:{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '52vh',
    },
    chatContainer:{
        padding:'40px',
        height:'52vh',
        width:'60vw'
    },
    inputBox:{
        width:'100%'
    },
    inputPaper:{
        bottom:'10px',
        width:"57vw",
        padding:'10px'
    }
}));

let socket;
export default function ChatView(props) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    // const [socket] = useState(() => io(':8000'));
    
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:8000'

    // socket.on("connect", () => {
    //     console.log(socket.connected); // true
    //     socket.emit('user', {userName:'moe'})
    // });
    
    useEffect(() => {  
        const {name, room} =props
        setName(name);
        setRoom(room)

        socket = io(ENDPOINT);

        socket.emit('join', {name:name, room:room}, ()=>{
            
        })

        // socket.on('onlineUsers', (data)=>{
        //     setOnlineUsers(users=> [...users, data])
        // })
        // // sessionStorage.setItem('myData', 'name')
        // socket.on("new user has joined", ()=>{
        //     setMessages(msgs=>[...msgs,'new user popped in'])
        // })
        // socket.on('updated messages', data => setMessages(msgs=>[...msgs,data]));
        return () => socket.disconnect(true);
    }, []);
    
    useEffect(() => {
        socket.on('message', (message)=>{
            setMessages((msgs)=>[...msgs, message])
        })

        socket.on('roomData', (roomData)=>{
            setOnlineUsers(roomData.users)
        })

        return () => socket.disconnect(true);
    }, []);
    
    // sessionStorage.setItem('myData', 'name')

    const sendMessage = (e) => {
        console.log('message sent')
        e.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''))
        }
    }
    
    console.log(message, messages)

    const classes = useStyles();
    return (
        <Grid container 
            direction="column"
            justify="center"
            alignItems="center"
            spacing={5}
            className={classes.main}
        >
            <Grid item>
                <Paper elevation={9} className={classes.inputPaper}>
                    <AvatarGroup max={4}>
                        {
                            onlineUsers.map(users =>{
                                return(
                                    <Avatar key={users} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                )
                            })
                        
                        }
                    </AvatarGroup>
                </Paper>
            </Grid>
            <Grid item xs={10} >
                <Paper elevation={9} className={classes.chatContainer}>
                    <List className={classes.chat}>
                        <ScrollToBottom>
                        {
                            messages.map(message =>{
                                return(
                                    <>
                                    <ListItem key={message} alignItems="flex-start">
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
                                    <Divider variant="inset" component="li" />
                                    </>
                                )
                            })
                        }
                        </ScrollToBottom>
                    </List>
                </Paper>
            </Grid>
            <Grid item >
                <Paper elevation={9} className={classes.inputPaper}>
                    <Grid container className={classes.inputBox} >
                        <Grid item xs={1}>
                            <FileUpload/>
                        </Grid>
                        <Grid item xs={11} >
                            <TextField
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
    );
    }