import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: "20px 10px"
  },
  margin: {
    margin: theme.spacing(1),
    width: '100%'
  },
  ml10: {
      marginLeft: '10px'
  },
  button: {
    margin: theme.spacing(1),
  },
  helper: {
    color: "red",
    fontSize: "12px",
    marginLeft: "10px"
  },
  card: {
    padding: "20px 25px 20px 10px",
    borderRadius: "10px",
    boxShadow: "0px 1px 4px 2px #cecede !important"
},
link : {
  color: "#5f77f9"
}
}));


const Login =   (props) => {

  const classes = useStyles();
  
  const [emailError, setEmailError] = useState(false)
  const [emailHelper, setEmailHelper] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState('')
  const [cred, setCred] = useState(false)
  const [credHelper, setCredHelper] = useState('')
  const [redirect, setRedirect] = useState(false);
  const [checked, setChecked] = React.useState(true);

  const validateEmail = () => {
    let value = document.getElementById('email').value.trim()
    if(value === ''){
      setEmailError(true)
      setEmailHelper("Email is required")
    }else{
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let valid = regex.test(value.toLowerCase());
      if(valid){
        setEmailError(false)
        setEmailHelper('')
      }else{
        setEmailError(true)
        setEmailHelper('Please provide a valid email')
      }
    }
  }

  const validatePassword = () => {
    let value = document.getElementById('password').value.trim()
    if(value === ''){
      setPasswordError(true)
      setPasswordHelper("Password is required")
    }else{
      setPasswordError(false)
      setPasswordHelper("")
    }
  }
  
  const storeToken = (token) => {
    window.localStorage.removeItem('token');
    window.localStorage.setItem('token', token);
    props.setLogin(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateEmail()
    validatePassword()
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value.trim()
    if(email === '' || password === ''){
      console.log("not submit")
      // props.setFormError(true)
      props.setSnackbar({type: "error", text: "Kindly, fix the highlighted error!"})
      props.setSnackbarStatus(true)
    }else{
      if (emailError === false && passwordError === false){
        console.log("submit")
        let data = JSON.stringify({ email: email, password: password })
        console.log(data)
        props.setBackdrop(true)
        await axios.post('https://task-manger-api-new.herokuapp.com/users/login',
         data,
         {
         headers: {
            'Content-Type': 'application/json'
         }
        })
          .then(function (response) {
            console.log(response);
            setCred(false)
            props.setBackdrop(false)
            // props.setFormSuccess(true)
            props.setSnackbar({type: "success", text: "Login successfull!"})
            props.setSnackbarStatus(true)
            setChecked(false)
            // window.location.reload(true)
            setTimeout(function(){
              setRedirect(true)
            }, 2000);
            // props.setLogin(false)
            console.log(response.data.token)
            storeToken(response.data.token)
          })
          .catch(function (error) {
            props.setBackdrop(false)
            console.log(error);
            setCred(true)
            setCredHelper("Either email or password is wrong!")
            props.setSnackbar({type: "warning", text: "Either email or password is wrong!"})
            props.setSnackbarStatus(true)
          }); 
      } 
    }
  }

  return (
    <Slide direction="right" in={checked} {...({ timeout: 500 })}>
    <form className={classes.root} noValidate  onSubmit={handleSubmit} autocomplete="off">
      <Grid container spacing={0} justifyContent='center' alignContent='center'> 
          <Grid item xs={12} sm={6} md={6} container className={classes.card}>
        <Typography variant="h5" component="h2" className={classes.ml10} color="primary" display="block">
            Plese Login 
        </Typography>
        <Grid item xs={12} sm={12}>
            <TextField
            id="email"
            name="email"
            label="Email"
            type="email" 
            required
            variant="outlined"
            className={classes.margin}
            onBlur={validateEmail}
            error={emailError}
            helperText={emailHelper !== '' ? emailHelper:''}
            />
            
        </Grid>
        <Grid item xs={12} sm={12}>
            <TextField
            id="password"
            name="password"
            label="Password"
            type="password" 
            required
            variant="outlined"
            className={classes.margin}
            onBlur={validatePassword}
            error={passwordError}
            helperText={passwordHelper !== '' ? passwordHelper:''}
            />
        </Grid>
        {
          cred ? (
            <Typography variant="h5" component="h2" className={classes.helper} color="primary" display="block">
              {credHelper}  
            </Typography>
          ) : ''
        }
        <Grid item xs={12} sm={12}>
            <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            endIcon={<SendIcon /> }
            size="large"
            >
            Login
            </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" component="h2" className={classes.ml10} color="primary">
              Not Signed up? <Link to="/signup" className={classes.link}>Sign up here</Link>
          </Typography>
        </Grid>
        </Grid>
        </Grid>
        {
          redirect ? <Redirect to="/" /> : ''
        }
    </form>
    </Slide>
  );
}

export default Login