import React, { useEffect} from 'react'
import { Link, Redirect  } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';


import axios from 'axios'; 

const drawerWidth = 240;
const token = window.localStorage.getItem('token');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    right: {
      marginRight: 'auto'
    },
    email: {
      fontSize: '12px'
    },
    marginWhite: {
      color: 'white !important' 
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    box: {
      textAlign: "center",
      display: "block"
    },
    box2: {
      display: "block",
      padding: "0px",
      textAlign: "right",
      margin: "0px"
    },
    profile: {
      height: "70px",
      width: "70px"
    },
    link : {
      color: "#f10a5f",
      paddingRight: "20px"
    }
  }));

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [demo, setDemo] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState(false);
  const [redirectLogin, setRedirectLogin] = React.useState(false);
  const [userData, setUserData] = React.useState({})
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handlelogout = () => {
    window.localStorage.removeItem('token');
    window.location.reload(true)
    setRedirectLogin(true);
    setUserLogin(false)
  }

    const handleThemeChange = (event) => {
      if (props.darkMode) {
      console.log("light")
        localStorage.setItem("preferred-theme", "light")
        props.setDarkMode(false)
      } else {
          console.log("dark")
        localStorage.setItem("preferred-theme", "dark")
        props.setDarkMode(true)
      }
    }

    console.log(userLogin)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      >
      <Box component="span" m={1}  className={classes.box2} >
        <IconButton onClick={toggleDrawer("left", false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider />

      <Box component="span" m={1}  className={classes.box} >
        <AccountCircleIcon  className={classes.profile} />
        <Typography variant="h6" noWrap className={classes.right}>
              {userData.name}
        </Typography>
        <Typography variant="h6" noWrap className={classes.email}>
              {userData.email}
        </Typography>
        { token ? (
            <List>
              <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
              endIcon={<ExitToAppIcon /> }
              onClick={handlelogout}
              size="large"
              >Logout</Button>
            </List>
          ) : (
            ''
          )
          }
      </Box>
      <Divider />

      <List>
          <ListItem button key="create-task">
            <Link to="/create-task" className={classes.link}><NoteAddIcon /></Link>
            <ListItemText primary="Create Task" />
          </ListItem>
          
          <ListItem button key="view-task">
            <Link to="/" className={classes.link}><ListIcon /></Link>
            <ListItemText primary="View Task" />
          </ListItem>
      </List>

      <Divider />
    </div>
  );

  useEffect(() => {
    if(window.localStorage.getItem('token')){
        const getUserData = async () => {
            // props.setBackdrop(true)  
            await axios.get('https://task-manger-api-new.herokuapp.com/users/me',
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
             }
            })
            .then(function (response) {
              console.log("user data", response);
              // response.data.map((item) => {
              //      tasks.push(item);
              // })
              // setAllTasks(tasks);
              // console.log('state', response.data)
              // props.setBackdrop(false)
              setUserData(response.data)
            })
            .catch(function (error) {
              // props.setBackdrop(false)
              console.log(error);
            }); 
          }
          getUserData();
          // console.log("user data state", userData)
        }

        setOpen(false)
        setDemo(false)
      }, [demo])
  

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>        
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
            
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.right}>
              Task Manager
            </Typography>

            {props.darkMode ? (
              <div>
              <IconButton className={classes.marginWhite} size="small" onClick={handleThemeChange}> 
                <Brightness4Icon />
              </IconButton>
              </div>
          ) : (
           <div>
            <IconButton className={classes.marginWhite} size="small" onClick={handleThemeChange}>
             <Brightness7Icon />
            </IconButton>
            </div>
          )
          
          }
          </Toolbar>
        </AppBar>
        
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            Lorem ipsum 
          </Typography>
          
        </main>
      </div>
      {
      redirectLogin ? <Redirect to="/login"/> : ''
    }
    </div>
    
  );
}
