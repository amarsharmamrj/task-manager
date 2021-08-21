import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route,Switch as SwitchRouter } from 'react-router-dom'
import Dashboard from './components/dashboard/dashboard'
import PageNotFound from './components/pageNotFound/pageNotFound'
import Login from './components/login/login'
import SignUp from './components/signUp/signUp'
import Tasks from './components/tasks/tasks'
// import UploadAvatar from './components/upload-avatar/UploadAvatar'
import CustomizedSnackbars from './components/helper/CustomizedSnackbars/CustomizedSnackbars'
import SimpleBackdrop from './components/helper/SimpleBackdrop/SimpleBackdrop'
import SpeedDial from './components/helper/SpeedDial'
import SwipeableTemporaryDrawer from './components/navbar/navbar'
import CreateTask from './components/createTask/CreateTask'                                                                                                                                 
import EditTask from './components/tasks/editTask'                                                                                                                                 
import { ThemeProvider, createTheme  } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';    

const BaseRoutes = () => {
    const [login, setLogin] = useState(true); 
    const [signUp, setSignUp] = useState(true); 
    // const [formError, setFormError] = useState(false);
    // const [formSuccess, setFormSuccess] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(false)
    const [snackbar, setSnackbar] = useState({});
    const [darkMode, setDarkMode] = useState(false)
    const [state, setState] = React.useState({
        checkedA: true
      });

   const themeType = localStorage.getItem("preferred-theme")
    const theme = createTheme ({                                                                                            
        palette: {
            type: themeType,
            primary: {
                 main: '#3f51b5',
            }
        }
      });

      const handleThemeChange = (event) => {
        setState({ [event.target.name]: event.target.checked });
        if (darkMode) {
        console.log("light")
          localStorage.setItem("preferred-theme", "light")
          setDarkMode(false)
        } else {
            console.log("dark")
          localStorage.setItem("preferred-theme", "dark")
          setDarkMode(true)
        }
      }

      console.log(login, signUp, state)

    useEffect(() => {
        const theme = localStorage.getItem("preferred-theme")
        if (theme) {
          const themePreference = localStorage.getItem("preferred-theme")
          if (themePreference === "dark") {
            setDarkMode(true)
          } else {
            setDarkMode(false)
          }
        } else {
          localStorage.setItem("preferred-theme", "light")
          setDarkMode(true)
        }
      },[])
    
    return (
        <div>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter  forceRefresh={false}>
                <SwipeableTemporaryDrawer darkMode={darkMode} setDarkMode={setDarkMode} handleThemeChange={handleThemeChange} />
       
                <SpeedDial />
                <SimpleBackdrop backdrop={backdrop} setBackdrop={setBackdrop} />

                <SwitchRouter>
                <Route path="/" component={Dashboard} exact />
                    <Route path="/" exact >
                        <Dashboard setLogin={setLogin} backdrop={backdrop} setBackdrop={setBackdrop} />
                    </Route>

                    <Route path="/login" exact>
                        <Login
                            setLogin={setLogin}
                            setBackdrop={setBackdrop}
                            setSnackbarStatus={setSnackbarStatus}
                            setSnackbar={setSnackbar}
                        />
                    </Route>

                    <Route path="/signup" exact>
                        <SignUp 
                            setLogin={setLogin} 
                            setSignUp={setSignUp}
                            setSnackbarStatus={setSnackbarStatus}
                            setSnackbar={setSnackbar}
                            setBackdrop={setBackdrop}
                        />
                    </Route>

                    <Route path="/create-task" exact>
                        <CreateTask
                            setLogin={setLogin}
                            setBackdrop={setBackdrop}
                            setSnackbarStatus={setSnackbarStatus}
                            setSnackbar={setSnackbar}
                        />
                    </Route>

                    <Route path="/edit-task" exact>
                        <EditTask
                            setLogin={setLogin}
                            setBackdrop={setBackdrop}
                            setSnackbarStatus={setSnackbarStatus}
                            setSnackbar={setSnackbar}
                        />
                    </Route>

                    <Route path="/tasks" exact>
                        <Tasks
                            setBackdrop={setBackdrop}
                            backdrop={backdrop}
                        />
                    </Route>
                    
                    {/* <Route path="/upload-avatar" exact>
                        <UploadAvatar
                            setBackdrop={setBackdrop}
                            backdrop={backdrop}
                        />
                    </Route> */}

                    <Route>
                        <PageNotFound />
                    </Route>
                    
                </SwitchRouter> 

            </BrowserRouter>
            </ThemeProvider>

            <CustomizedSnackbars 
                snackbarStatus={snackbarStatus}
                setSnackbarStatus={setSnackbarStatus}
                snackbar={snackbar}
            />


        </div>
    )
}

export default BaseRoutes