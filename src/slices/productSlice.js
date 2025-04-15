import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../config/axios'

export const createProduct = createAsyncThunk('product/createProduct', async ({ formData , navigate}, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/products', formData, { headers: { Authorization: localStorage.getItem('token') } })
        navigate('/all-products')
        return response.data
    } catch (e) {
        return rejectWithValue({
            errors: e.response.data.errors
        })
    }
})

const productsSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        serverErrors :null
    },

    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.serverErrors = action.payload
        })
    }
})

export default productsSlice.reducer