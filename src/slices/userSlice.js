import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../config/axios'


export const fetchUserAccount = createAsyncThunk('user/fetchUserAccount', async (undefined, { rejectWithValue }) => {
    try {
        const response = await axios.get('/user/account', { headers: { Authorization: localStorage.getItem('token') } })
        return response.data
    } catch (e) {
        console.log(e);
        return rejectWithValue({
            errors: e.response.data.errors
        })

    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        isLoggedIn: false,
        serverErrors: null,

    },

    extraReducers: (builder) => {
        builder.addCase(fetchUserAccount.fulfilled, (state, action) => {
            state.data = action.payload
            state.isLoggedIn = true
        })
        builder.addCase(fetchUserAccount.rejected, (state, action) => {
            state.data = action.payload
            state.isLoggedIn = false
        })
    },


    reducers: {
        login: (state, action) => {
            state.data = action.payload
            state.isLoggedIn = true
        },

        logout: (state, action) => {
            state.data = null
            state.isLoggedIn = false
        }
    },


})

export const { login, logout } = userSlice.actions
export default userSlice.reducer