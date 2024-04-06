import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import api from '../../utils/api'

export const userLogin = createAsyncThunk('userLogin',async ({ email, password }) => {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        localStorage.removeItem('token');
        throw error;
    }
})

export const saveProfile = createAsyncThunk('saveProfile',async (token) => {
    const { data } = await api.get('/profile', {
        headers: { Authorization: token }
    });
    console.log(data)
    return {data,token}
})

const userSlice = createSlice({
    name:"userData",
    initialState:{
        isLoading:false,
        isError:false,
        user:[],
        token:'',
        isLoggedin:false
    },
    extraReducers:(builder) => {
        builder.addCase(userLogin.fulfilled ,(state,action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedin = true;
            state.isError = false;
        })
        builder.addCase(userLogin.pending ,(state) => {
            state.isLoading = true,
            state.isLoggedin = false
        })
        builder.addCase(userLogin.rejected ,(state,action) => {
            state.isLoading = false
            state.isError = true
            state.isLoggedin = false
            console.log("error in getting user data",action.payload)
        })
        builder.addCase(saveProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.data.user; 
            state.token = action.payload.token;
        });
        builder.addCase(saveProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(saveProfile.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            console.log("Error in saving profile data");
        });
    }
})

export default userSlice.reducer