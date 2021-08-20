import React, { useEffect } from 'react'
import { Link, Redirect  } from 'react-router-dom'
import {
    makeStyles,
  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Task from './task';
import axios from 'axios'; 

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
      padding: "20px 10px 20px 10px",
      borderRadius: "10px",
      boxShadow: "0px 1px 4px 2px #cecede !important"
    },
    white: {
      color: "white",
      textDecoration: "none"
    },
    m10: {
      margin: "10px"
    }
  }));
  
let tasks = []  

const Tasks = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [allTasks, setAllTasks] = React.useState([]);
  const [demo, setDemo] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false);

useEffect(() => {
  if(window.localStorage.getItem('token')){
      const getTasksByToken = async () => {
          props.setBackdrop(true)  
          await axios.get('https://task-manger-api-new.herokuapp.com/tasks?sortBy=createdAt:desc',
          {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
           }
          })
          .then(function (response) {
            console.log(response);
            response.data.map((item) => {
                 tasks.push(item);
            })
            setAllTasks(tasks);
            console.log('state', allTasks)
            props.setBackdrop(false)
          })
          .catch(function (error) {
            props.setBackdrop(false)
            console.log(error);
          }); 
        }
        getTasksByToken();
      }
    }, [demo])

    const tasks = allTasks.map((item, i) =>
    <Slide key={i} direction="right" in={checked} {...({ timeout: 500 + i*120 })}>
      <Grid key={i} item xs={12} sm={12} md={12} className={classes.m10}>
        <Paper key={i} elevation={2} >  
          <Task key={i} item={item} id={item._id} setBackdrop={props.setBackdrop} setRedirect={setRedirect} />
        </Paper>
      </Grid>
    </Slide>
    );
    
    return (
      <Slide direction="right" in={checked} {...({ timeout: 500 })}>

      <Grid item xs={12} sm={6} md={6} container  spacing={3} className={classes.list}>

        { window.localStorage.getItem('token') ? (
            <Grid container xs={12} sm={6} md={12} className={classes.list}>
                  <Typography variant="h6" component="h2" color="primary">
                    {allTasks.length > 0 ? '' : 'No task available, '}
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                      endIcon={<NoteAddIcon /> }
                      size="large"
                      >
                     <Link to="/create-task" className={classes.white}>Create new task</Link>
                    </Button>
                  </Typography>
                  {tasks}
                </Grid>
              
          ) : (
            <Redirect to="/login" />
          )
        }
        {
          redirect ? <Redirect to="/edit-task"/> : ''
        }
      </Grid>
      </Slide>

    )
}

export default Tasks;