import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../../utils/api'

export const userLogin = createAsyncThunk('userLogin',async ({ email, password }) => {
    const {data} = await api.post('/auth/login',{
        email,
        password
    })
    localStorage.setItem('token', data.token);
    return data
})

export const saveProfile = () => {

}

// export const userLogout = () => {
//     localStorage.removeItem('token');
    
// };

const userSlice = createSlice({
    name:"user",
    initialState:{
        isLoading:false,
        isError:false,
        user:[],
        token:''
    },
    extraReducers:(builder) => {
        builder.addCase(userLogin.fulfilled ,(state,action) => {
            state.isLoading = false
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        builder.addCase(userLogin.pending ,(state) => {
            state.isLoading = true
        })
        builder.addCase(userLogin.rejected ,(state,action) => {
            state.isLoading = false
            state.isError = true
            console.log("error in getting user data",action.payload)
        })

        // builder.addCase(saveProfile.pending, (state) => {
        //     state.isLoading = true;
        //     state.isError = '';
        // })
        // builder.addCase(saveProfile.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload.user;
        // })
        // builder.addCase(saveProfile.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = action.payload;
        // })

        // builder.addCase(userLogout, (state) => {
        //     state.user = [];
        //     state.isLoggedIn = false;
        //     state.token = '';
        // });
    }
})

export default userSlice.reducer