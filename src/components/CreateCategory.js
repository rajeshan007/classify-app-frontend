import React, { useEffect, useState, } from 'react'
import { createCategory, clearEditId, updateCategory } from '../slices/categorySlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { serverErrors, editId, categories } = useSelector(state => state.category)


    const category = categories.find(ele => ele._id === editId)



    const [name, setName] = useState('')
    const [clientErrors, setClientErrors] = useState({})


    const handleSubmit = (e) => {
        e.preventDefault()

        const errors = {}
        if (name.length === 0) {
            errors.name = 'name is required'
        }


        const resetForm = () => {
            setName('')
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            setClientErrors({})

            const formData = {
                name: name
            }
            if (category) {
                dispatch(updateCategory({ category, formData , navigate}))
            } else {
                dispatch(createCategory({ formData, resetForm, navigate }))
            }


        }

    }

    useEffect(() => {
        if (category) {
            setName(category ? category.name : '')
        }
    }, [category])



    return (
        <div>
            <h1> create product category</h1>

            {serverErrors?.errors && (
                <>
                    <p>These errors are prohibited from creating the category:</p>
                    <ul>
                        {serverErrors.errors.map((ele, i) => (
                            <li key={i}>{ele.msg}</li>
                        ))}
                    </ul>
                </>
            )}
            <form onSubmit={handleSubmit} >
                <label htmlFor='category' >  <b> {category ? "enter new category name : " : 'enter category name'}</b>  </label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} id='category' /> {clientErrors.name && <span style={{ color: 'red' }} > {clientErrors.name}</span>} <br />
                <input type='submit' value={category ? 'update category' : "create"} />
            </form>
            {category && <button onClick={() => { dispatch(clearEditId('')); setName(''); navigate('/list-category'); }} > cancel </button>}
        </div>
    )
}

export default CreateCategory