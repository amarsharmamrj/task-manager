import React, {useEffect} from 'react'
import BaseRoutes from './Baseroutes'
import SwipeableTemporaryDrawer from './components/navbar/navbar'
import Tasks from './components/tasks/tasks'
import axios from 'axios'; 


const App = () => { 
    return (
        <div>

            {/* <SwipeableTemporaryDrawer />
            <Tasks /> */}
            <BaseRoutes />
        </div>
    )
}

export default App