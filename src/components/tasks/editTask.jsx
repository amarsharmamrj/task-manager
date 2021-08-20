import React, { useEffect, useState } from 'react'
import { Redirect  } from 'react-router-dom'
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
      width: '100%',
      paddingLeft: "60px"
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
  }
  }));

const EditTask = (props) => {
  const classes = useStyles();
  const [taskError, setTaskError] = useState(false)
  const [taskHelper, setTaskHelper] = useState('')

  const [redirect, setRedirect] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [demo, setDemo] = React.useState(false)

    let editId = window.localStorage.getItem('editId')
    console.log("final editId", editId)

  const loadTask = async () => {
    props.setBackdrop(true)
    await axios.get(`https://task-manger-api-new.herokuapp.com/tasks/${editId}`,
         {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
         }
        })
          .then(function (response) {
            console.log(response);
            props.setBackdrop(false)
            document.getElementById('task').value = response.data.description
          })
          .catch(function (error) {
            props.setBackdrop(false)
            console.log(error);
          }); 
  }
  

  const validateTask = () => {
    let value = document.getElementById('task').value.trim()
    if(value === ''){
        setTaskError(true)
        setTaskHelper("Task is required")
    }else if(value.length < 2){
        setTaskError(true)
        setTaskHelper("Task is required")
    }else{
        setTaskError(false)
        setTaskHelper("")
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    validateTask();
    
    let task = document.getElementById('task').value.trim()
    
    if(task === ''){
      console.log("not submit")
      props.setSnackbar({type: "error", text: "Kindly, fix the highlighted error!"})
      props.setSnackbarStatus(true)
    }else{
      if (taskError === false){
        console.log("submit")
        let data = JSON.stringify({ description: task})
        console.log(data)
        props.setBackdrop(true)
        await axios.patch(`https://task-manger-api-new.herokuapp.com/tasks/${editId}`,
         data,
         {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
         }
        })
          .then(function (response) {
            console.log(response);
            props.setBackdrop(false)
            setChecked(false)
            props.setSnackbar({type: "success", text: "Task updated successfully!"})
            props.setSnackbarStatus(true)
            setTimeout(function(){
              setRedirect(true)
            }, 1000);
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
  
  useEffect(() => {
   loadTask();

  }, [demo])


    return (
    <Slide direction="right" in={checked} {...({ timeout: 500 })}>
    <form className={classes.root} noValidate  onSubmit={handleSubmit}>
       <Grid container spacing={0} justifyContent='center'> 
          <Grid item xs={12} sm={6} md={6} container className={classes.card}>
        <Typography variant="h5" component="h2" className={classes.ml10} color="primary">
            Edit Task 
        </Typography>
        <Grid item xs={12} sm={12}>
            <TextField
            id="task"
            name="task"
            label="Task"
            type="text" 
            required
            variant="outlined"
            className={classes.margin}
            onBlur={validateTask}
            error={taskError}
            helperText={taskHelper !== '' ? taskHelper:''}
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
            Update Task
            </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
        </Grid>
        </Grid>
        </Grid>
        {
          redirect ? <Redirect to="/" /> : ''
        }
    </form>
    </Slide>
    )
}

export default EditTask;