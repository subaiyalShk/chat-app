import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {Paper, Icon, Grid, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Card, CardContent, CardHeader, Button, Avatar, CssBaseline, TextField, Typography, Container } from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import OnlineUsers from '../components/OnlineUsers'
import io from 'socket.io-client';
import Imessenger from '../components/InstantMessenger';

const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor:'#120B29',
        height:'100vh',
        padding:'20px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    messenger:{
        height:'100%'
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

        socket.emit('join', {name:name, room:room}, (error)=>{
            
            if(error){
                console.log(error)
                navigate('/')
            }
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
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
            className={classes.main}
        >
            <Grid item xs={3}>
                <OnlineUsers users={onlineUsers} />
            </Grid>
            <Grid item xs={9}  >
                <Imessenger 
                    messages={messages} 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage}
                />
            </Grid>
        </Grid>
    );
    }