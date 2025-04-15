import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, deleteCategory, setEditId } from '../slices/categorySlice'
import { useNavigate, Link } from 'react-router-dom'


const AllCategories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])



    const handleDelete = (id) => {
        const confirm = window.confirm('are you sure?')
        if (confirm) {
            dispatch(deleteCategory(id))
        }

    }

    const handleEdit = (id) => {
        dispatch(setEditId(id))
        navigate('/create-category')
    }

    return (
        <div>
            <h1> total categories - {categories.length} </h1>
            <ul>
                {categories.map((ele) => {
                    return <li key={ele._id} >  <b>  {ele.name}  </b>
                        <button onClick={() => { handleDelete(ele._id) }} > delete </button>
                        <button onClick={() => { handleEdit(ele._id) }} > edit </button>

                    </li>
                })}
            </ul>

        </div>
    )
}

export default AllCategories