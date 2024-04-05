import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/user'



const appStore = configureStore({
    reducer:{
        userData: userReducer
    }
})

export default appStore