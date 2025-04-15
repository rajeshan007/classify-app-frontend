import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import categoryReducer from '../slices/categorySlice'
import productsReducer from '../slices/productSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        product: productsReducer
    }
})


export default store