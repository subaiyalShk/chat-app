import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import { Router, navigate } from '@reach/router';
import UpdateView from './views/UpdateView'
import ChatView from './views/ChatView'
import LoginView from './views/LoginView'
import JoinView from './views/JoinView'
import axios from 'axios'
import io from 'socket.io-client';


axios.interceptors.response.use(response => response, 
  ()=>navigate('/login'))

function App() {
  const[name, setName]= useState('');
  const[room, setRoom]= useState('');
  
  return (
    <div className="App">
      <Router>
        <ChatView path="/chat/:name/:room" />
        <JoinView setName={setName} name={name} room={room} setRoom={setRoom} path="/" />
      </Router>
    </div>
  );
}

export default App;
