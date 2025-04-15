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

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
    try {
        const response = await axios.delete(`/api/delete/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        return response.data
    } catch (e) {
        console.log(e);
    }
})

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, formData }) => {
    try {
        const response = await axios.put(`/api/update/${id}`, formData, { headers: { Authorization: localStorage.getItem('token') } })
        console.log(response.data);
    } catch (e) {
        console.log(e);
    }
})




const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        serverErrors: null,
        editId: null
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

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            const index = state.categories.findIndex(ele => ele._id === action.payload._id)
            state.categories.splice(index, 1)
        })

    },
    reducers: {
        setEditId: (state, action) => {
            state.editId = action.payload
        },
        clearEditId: (state, action) => {
            state.editId = action.payload
        }
    }


})
export const { setEditId , clearEditId} = categorySlice.actions
export default categorySlice.reducer