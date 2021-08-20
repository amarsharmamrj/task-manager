import React, { useState } from 'react';
import SwipeableTemporaryDrawer from '../navbar/navbar'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Login from '../login/login' 
import SignUp from '../signUp/signUp'
import CustomizedSnackbars from '../helper/CustomizedSnackbars/CustomizedSnackbars'
import SimpleBackdrop from '../helper/SimpleBackdrop/SimpleBackdrop'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Tasks from '../tasks/tasks'
import Image from '../image/Image'

const useStyles = makeStyles(() => ({
    card: {
        padding: "10px",
        boxShadow: "0px 1px 4px 2px #cecede !important"
    }
  }));
  

const Dashboard = () => {

  const [login, setLogin] = useState(true); 
  const [signUp, setSignUp] = useState(true); 
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    }

  const classes = useStyles();
    return (
        <div> 
            <SimpleBackdrop backdrop={backdrop} setBackdrop={setBackdrop} />
            {/* <SwipeableTemporaryDrawer /> */}
            <Grid container spacing={0}> 
                {/* <Grid item xs={12} container spacing={0} justifyContent='center'>
                    <Grid item xs={12} sm={6} container justifyContent='center' className={classes.card}>
                    {window.localStorage.getItem('token')?<div>User is login</div>:''}

                    {window.localStorage.getItem('token')?
                    (<Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={<SendIcon /> }
                    size="large"
                    onClick={handleLogout}
                    >
                    Logout
                    </Button>) :''}
                    </Grid>
                </Grid> */}
                <Grid item xs={12} container spacing={0} justifyContent='center'>
                    <Grid  item xs={12} sm={12}>
                        {/* <Paper> */}
                            {/* <Image /> */}
                            <Tasks
                                setBackdrop={setBackdrop}
                                backdrop={backdrop}
                            />
                        {/* </Paper>  */}
                        {/* <FieldLevelValidationExample /> */}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard