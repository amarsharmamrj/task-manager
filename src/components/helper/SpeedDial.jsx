import React from 'react';
import { Link, Redirect  } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '2px',
    right: '2px',
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  staticTooltipLabel: {
      minWidth: '120px !important'
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  link : {
    color: "#f10a5f"
  }
}));

const useStylesTooltip = makeStyles((theme) => ({
    staticTooltipLabel: {
        minWidth: '120px !important'
    }
  }));


export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const classesToolTip = useStylesTooltip();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  
const actions = [
  { icon: <Link to="/login" className={classes.link}><PersonIcon /></Link>, name: 'Login' },
  {icon: <Link to="/" className={classes.link}><ListIcon /></Link>, name: 'View Task'},
  {icon: <Link to="/create-task" className={classes.link}><NoteAddIcon /></Link>, name: 'Create Task'}
];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            classes={classesToolTip}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
