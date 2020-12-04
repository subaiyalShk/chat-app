import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import RegistrationForm from '../components/RegistrationForm';
import {Box, TextField, Button, Paper, Grid, Link, Checkbox, FormControlLabel, CssBaseline, Avatar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/Zsqbptb_j-Y)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function Login(props){
  const [firstName, setFname]=useState("");
  const [lastName, setLname]=useState("");
  const [userName, setUserName]= useState('');
  const [email, setEmail]=useState("");
  const [password, setPassword]= useState("");
  const [confirmPassword, setPasswordConf]= useState("");
  const {setReset, setUser} = props;
  const [err, setErr] = useState('');
  const [toggle, setToggle]=useState(true);

  function errorHandler(obj){
    if(obj.errors){
      if('password' in obj.errors){
        return(obj.errors.password.message)
      }else if('confirmPassword' in obj.errors){
        return(obj.errors.confirmPassword.message)
      }else if('email' in obj.errors){
        return(obj.errors.email.message)
      }else if('firstName' in obj.errors){
        return(obj.errors.firstName.message)
      }else if('lastName' in obj.errors){
        return(obj.errors.lastName.message)
      }else if('userName' in obj.errors){
        return(obj.errors.userName.message)
      }
    }else if(obj.keyPattern){
      if('email' in obj.keyPattern){
        return('This email is already registered')
      }else if('userName' in obj.keyPattern){
        return('This username is already registered')
      }
    }else{
      return('something went wrong')
    }
  }
  
  
  function handleLogin(event){
      event.preventDefault();
      setErr('')
      axios.post('http://localhost:8000/api/users/login', {
          email,
          password
      }, { withCredentials:true })
      .then((response)=>{
        sessionStorage.setItem("user", JSON.stringify(response.data))
        navigate('/')
      })
      .catch(()=>setErr('Please check your credentials !'));
  }

  function handleRegister(event){
    event.preventDefault();
    setErr('')
    axios.post('http://localhost:8000/api/users', {
      email, 
      password, 
      confirmPassword, 
      firstName, 
      lastName,
      userName
    }, {withCredentials:true})
    .then((response)=>{
      sessionStorage.setItem("user", JSON.stringify(response.data))
      setReset((reset)=>{return(!reset)})
      navigate('/')
    })
    .catch(err => {
      // if(err.response.data!==undefined){
      //   setErr(()=>errorHandler(err.response.data))
      // }else{
        setErr('something else went wrong')
      // }
      console.log(err)
    }); 
  }
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              {toggle?"Sign in":"Create a Profile"}
            </Typography>
          {
              err && (
                  <p style={{color:'red'}}>{err}</p>
              )
          }
          {
            toggle?
              <form onSubmit={handleLogin} className={classes.form} noValidate>
                <Typography variant="body2" color="textSecondary" component="p">
                    Use the following credentials for demo : 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    email: subi@gmail.com
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    password: 1234567890 
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link onClick={(e)=>{e.preventDefault();setToggle((toggle)=>{return(!toggle)})}} href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
                <Box mt={5}>
                </Box>
            </form>:
            <form onSubmit={handleRegister} className={classes.form} noValidate>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="First Name"
                      name="fname"
                      autoFocus
                      value={firstName}
                      onChange={e => setFname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Last Name"
                      name="fname"
                      autoFocus
                      value={lastName}
                      onChange={e => setLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Username"
                      name="userName"
                      autoFocus
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={e => setPasswordConf(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                  Register
                  </Button>
                </Grid>
              </Grid>
            <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
              Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={(e)=>{e.preventDefault();setToggle((toggle)=>{return(!toggle)})}} href="#" variant="body2">
              {"Login"}
              </Link>
            </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
            }
            </div>
        </Grid>
        </Grid>
      </div>
      );
}

