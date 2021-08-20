import React, { useState } from 'react'
import { Link, Redirect  } from 'react-router-dom'
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
    card: {
      padding: "20px 25px 20px 10px",
      borderRadius: "10px",
      boxShadow: "0px 1px 4px 2px #cecede !important"
  },
  link : {
    color: "#5f77f9"
  }
  }));
  
const SignUp = (props) => {
  const classes = useStyles();
  const [nameError, setNameError] = useState(false)
  const [nameHelper, setNameHelper] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [emailHelper, setEmailHelper] = useState('')
  const [ageError, setAgeError] = useState(false)
  const [ageHelper, setAgeHelper] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState('')
  const [redirect, setRedirect] = useState(false);
  const [checked, setChecked] = React.useState(true);
  
  const validateName = () => {
    let value = document.getElementById('name').value.trim()
    if(value === ''){
        setNameError(true)
        setNameHelper("Name is required")
    }else if(value.length < 2){
        setNameError(true)
        setNameHelper("Name is required")
    }else{
        setNameError(false)
        setNameHelper("")
    }
  }

  const validateEmail = () => {
    let value = document.getElementById('email').value
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
  
  const validateAge = () => {
    let value = document.getElementById('age').value
    if(value === ''){
        setAgeError(true)
        setAgeHelper("Age is required")
    }else{
        setAgeError(false)
        setAgeHelper("")
    }
  }

  const validatePassword = () => {
    let value = document.getElementById('password').value
    if(value === ''){
      setPasswordError(true)
      setPasswordHelper("Password is required")
    }else if(value.length < 8){
        setPasswordError(true)
        setPasswordHelper("Atleast 8 character required")
    }else{
      setPasswordError(false)
      setPasswordHelper("")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateName();
    validateEmail()
    validateAge();
    validatePassword()
    let name = document.getElementById('name').value.trim()
    let email = document.getElementById('email').value.trim()
    let age = parseInt(document.getElementById('age').value)
    let password = document.getElementById('password').value.trim()
    if(name === '' || email === '' || age == '' || password === ''){
      console.log("not submit")
      props.setSnackbar({type: "error", text: "Kindly, fix the highlighted error!"})
      props.setSnackbarStatus(true)
    }else{
      if (nameError === false && emailError === false && ageError === false && passwordError === false){
        console.log("submit")
        console.log(age)
        let data = JSON.stringify({ name: name, email: email, age: age, password: password })
        console.log(data)
        props.setBackdrop(true)
        await axios.post('https://task-manger-api-new.herokuapp.com/users/',
         data,
         {
         headers: {
            'Content-Type': 'application/json'
         }
        })
          .then(function (response) {
            console.log(response);
            props.setSignUp(false)
            props.setLogin(true)
            props.setBackdrop(false)
            setChecked(false)
            props.setSnackbar({type: "success", text: "Form submitted successfully!"})
            props.setSnackbarStatus(true)
            setTimeout(function(){
              setRedirect(true)
            }, 2000);
          })
          .catch(function (error) {
            props.setBackdrop(false)
            props.setSnackbar({type: "warning", text: "Something went wrong, Try agrain!"})
            props.setSnackbarStatus(true)
            console.log(error);
          }); 
        
      } 
    }
  }

  return (
    <Slide direction="right" in={checked} {...({ timeout: 500 })}>
    <form className={classes.root} noValidate  onSubmit={handleSubmit}>
       <Grid container spacing={0} justifyContent='center'> 
          <Grid item xs={12} sm={6} md={6} container className={classes.card}>
        <Typography variant="h5" component="h2" className={classes.ml10} color="primary">
            Sign Up
        </Typography>
        <Grid item xs={12} sm={12}>
            <TextField
            id="name"
            name="name"
            label="Name"
            type="text" 
            required
            variant="outlined"
            className={classes.margin}
            onBlur={validateName}
            error={nameError}
            helperText={nameHelper !== '' ? nameHelper:''}
            />
        </Grid>
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
            id="age"
            name="age"
            label="Age"
            type="number"  
            required
            variant="outlined"
            className={classes.margin}
            onBlur={validateAge}
            error={ageError}
            helperText={ageHelper !== '' ? ageHelper:''}
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
        <Grid item xs={12} sm={12}>
            <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            endIcon={<SendIcon /> }
            size="large"
            >
            Sign Up
            </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
        <Typography variant="h6" component="h2" className={classes.ml10} color="primary">
            Already signed up? <Link to="/login" className={classes.link}>Login here</Link>
        </Typography>
        </Grid>
        </Grid>
        </Grid>
        {
          redirect ? <Redirect to="/login" /> : ''
        }
    </form>
    </Slide>
  );
} 

export default SignUp