import React, { useState, } from 'react'
import { createCategory } from '../slices/categorySlice'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { serverErrors } = useSelector(state => state.category)


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
            dispatch(createCategory({ formData, resetForm, navigate }))

        }

    }



    return (
        <div>
            <h1> create product category</h1>

            {serverErrors?.errors  && (
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
                <label htmlFor='category' > enter category name  : </label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} id='category' /> {clientErrors.name && <span style={{ color: 'red' }} > {clientErrors.name}</span>} <br />
                <input type='submit' value='create category' />


            </form>
        </div>
    )
}

export default CreateCategory