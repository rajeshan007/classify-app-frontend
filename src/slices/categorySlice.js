import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../config/axios'


export const createCategory = createAsyncThunk('category/createCategory', async ({ formData, resetForm, navigate }, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/create', formData, { headers: { Authorization: localStorage.getItem('token') } })
        resetForm()
        navigate('/list-category')
        return response.data
        
    } catch (e) {
        console.log(e);
        return rejectWithValue({
            errors: e.response.data.errors
        })
    }

})

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    try {
        const response = await axios.get('/api/categories', { headers: { Authorization: localStorage.getItem('token') } })
        return response.data
    } catch (e) {
        console.log(e);
    }
})




const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        serverErrors: null
    },

    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories.push(action.payload)
            state.serverErrors = null
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.serverErrors = action.payload

        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.serverErrors = action.payload
        })



    }


})

export default categorySlice.reducer