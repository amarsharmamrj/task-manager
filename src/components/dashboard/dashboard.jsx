import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleBackdrop from '../helper/SimpleBackdrop/SimpleBackdrop'
import Tasks from '../tasks/tasks'

// const useStyles = makeStyles(() => ({
//     card: {
//         padding: "10px",
//         boxShadow: "0px 1px 4px 2px #cecede !important"
//     }
//   }));
  

const Dashboard = () => {

//   const [login, setLogin] = useState(true); 
//   const [signUp, setSignUp] = useState(true); 
//   const [formError, setFormError] = useState(false);
//   const [formSuccess, setFormSuccess] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

//   const handleLogout = () => {
//     window.localStorage.removeItem('token')
//     }

//   const classes = useStyles();
    return (
        <div> 
            <SimpleBackdrop backdrop={backdrop} setBackdrop={setBackdrop} />
            <Grid container spacing={0}> 
                <Grid item xs={12} container spacing={0} justifyContent='center'>
                    <Grid  item xs={12} sm={12}>
                            <Tasks
                                setBackdrop={setBackdrop}
                                backdrop={backdrop}
                            />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard