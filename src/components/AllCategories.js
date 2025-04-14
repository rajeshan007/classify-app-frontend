import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, deleteCategory } from '../slices/categorySlice'

const AllCategories = () => {
    const dispatch = useDispatch()

    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])



    const handleClick = (id) => {
        const confirm = window.confirm('are you sure')
        if (confirm) {
            dispatch(deleteCategory(id))
        }

    }

    return (
        <div>
            <h1> all categories </h1>
            <ul>
                {categories.map((ele) => {
                    return <li key={ele._id} >  <b> {ele.name} </b>   <button onClick={() => { handleClick(ele._id) }} > delete </button>  </li>
                })}
            </ul>

        </div>
    )
}

export default AllCategories