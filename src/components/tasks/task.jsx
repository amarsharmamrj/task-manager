import React, { useEffect } from 'react'
// import { Redirect  } from 'react-router-dom'
import {
  makeStyles,
} from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
// import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import axios from 'axios'; 
import AlertDialog from '../helper/AlertDialog'

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: "20px 10px"
  },
  tick: {
    color: "white",
    backgroundColor: "green"
  },
  delete: {
    color: "red"
  },
  edit: {
    color: "#0dd40a"
  },
  desc: {
    color: "#f92892"
  }
}));

const useListStyle = makeStyles((theme) => ({
  root: {
      padding: '0px 8px'
  }
}));


export default function Task(props) {
  const classes = useStyles();
  const classesListStyle = useListStyle();
  // const [redirect, setRedirect] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  // const [edit, setEdit] = React.useState(false);

  const handleDelete = async () => {
    console.log("delete", props.id)
    setDialog(true);
  }
  
  const handleEdit = () => {
    console.log("edit", props.id);
    window.localStorage.setItem('editId', props.id)
    props.setRedirect(true)
  }

  useEffect(()=>{
    
    // edit == true ? <Redirect to="/" /> : ''
    // console.log("edit", edit)
  
    console.log("dialog", dialog)
    console.log("delete",confirmDelete)

    async function fetchData(){
      if(confirmDelete === true){
        props.setBackdrop(true)
        await axios.delete(`https://task-manger-api-new.herokuapp.com/tasks/${props.id}`,
          {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
           }
          })
          .then(function (response) {
            console.log(response);
            props.setBackdrop(false)
            window.location.reload(true)
          })
          .catch(function (error) {
            props.setBackdrop(false)
            console.log(error);
          }); 
    }
    fetchData();

    }
  }, [dialog])
  

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Demo>
            <List classes={classesListStyle}>
                <ListItem classes={classesListStyle}>
                <ListItemAvatar>
                  <Avatar className={classes.tick}>
                    <DoneAllIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className={classes.desc}
                  primary={props.item.description}
                  secondary={`Created At: ${moment(props.item.createdAt).format('hh:mm a, DD/MMM/YYYY')}`}
                />
                  <IconButton onClick={handleEdit} className={classes.edit} edge="end" aria-label="edit" tooltip="Edit task" tooltipposition="bottom-left">
                    <EditIcon/>
                  </IconButton>
                  <IconButton onClick={handleDelete} className={classes.delete} edge="end" aria-label="delete" tooltip="Delete task" tooltipposition="bottom-left">
                    <DeleteIcon/>
                  </IconButton>
                </ListItem>
            </List>
          </Demo>
        </Grid>
      <AlertDialog dialog={dialog} setDialog={setDialog} setConfirmDelete={setConfirmDelete} />
      </Grid>      
  );
}
