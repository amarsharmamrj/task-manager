import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setSnackbarStatus(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.snackbarStatus} autoHideDuration={1500} onClose={handleCloseError}>
        <Alert severity={props.snackbar.type}>{props.snackbar.text}</Alert>
      </Snackbar>
    </div>
  );
}
