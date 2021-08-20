import React, { useEffect } from 'react'
import {
    makeStyles,
  } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'; 

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex', 
      flexWrap: 'wrap',
      padding: "20px 10px"
    }
  }));
  
let tasks = []  

const Image = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [allTasks, setAllTasks] = React.useState([]);
  const [demo, setDemo] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false);

// useEffect(() => {
//       const getTasksByToken = async () => {
//           // props.setBackdrop(true)  
//           await axios.get('https://picsum.photos/400/280',
//           {
//           headers: {
//               'Content-Type': 'application/json',
//            }
//           })
//           .then(function (response) {
//             console.log(response);
//             // response.data.map((item) => {
//             //      tasks.push(item);
//             // })
//           }) 
//           .catch(function (error) { 
//             console.log(error);
//           }); 
//         }
//         getTasksByToken();
//     }, [demo])

    return (
          <Slide direction="down" in={checked} {...({ timeout: 500 })}>
            <Grid container md={3} spacing={0}> 
                <Grid item xs={12} sm={12} md={12} spacing={3} className={classes.list}>
                  <Typography variant="h6" component="h2" color="primary">
                    <img src="https://picsum.photos/400/280" height="100%" width="92%" alt="image" />
                  </Typography>
                </Grid>
              </Grid>
          </Slide>  
    )
}

export default Image;