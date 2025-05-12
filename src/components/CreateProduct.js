import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct } from '../slices/productSlice'
import { useNavigate } from 'react-router-dom'


const CreateProduct = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [isApproved, setIsApproved] = useState(false)
    const [clientErrors, setClientErrors] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categories } = useSelector(state => state.category)
    const { serverErrors } = useSelector(state => state.product)



    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = {}
        if (title.trim().length === 0) errors.title = 'Title is required'
        if (price.trim().length === 0) errors.price = 'Price is required'
        if (quantity.trim().length === 0) errors.quantity = 'Quantity is required'
        if (description.trim().length === 0) errors.description = 'Description is required'

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            const formData = {
                title: title.trim(),
                price: price.trim(),
                quantity: quantity.trim(),
                description: description.trim(),
                category,
                isApproved
            }
            dispatch(createProduct({ formData, navigate }))
        }
    }

    // return (
    //     <div>
    //         <h1>Create Product</h1>

    //         {serverErrors?.errors && (
    //             <>
    //                 <p>These errors are prohibited from creating the category:</p>
    //                 <ul>
    //                     {serverErrors.errors.map((ele, i) => (
    //                         <li key={i}>{ele.msg}</li>
    //                     ))}
    //                 </ul>
    //             </>
    //         )}
    //         <form onSubmit={handleSubmit}>
    //             <label>Enter Title:</label>
    //             <input
    //                 type='text'
    //                 value={title}
    //                 onChange={(e) => setTitle(e.target.value)}
    //             />
    //             {clientErrors.title && <span>{clientErrors.title}</span>}
    //             <br />

    //             <label>Enter Price:</label>
    //             <input
    //                 type='number'
    //                 value={price}
    //                 onChange={(e) => setPrice(e.target.value)}
    //             />
    //             {clientErrors.price && <span>{clientErrors.price}</span>}
    //             <br />

    //             <label>Enter Quantity:</label>
    //             <input
    //                 type='number'
    //                 value={quantity}
    //                 onChange={(e) => setQuantity(e.target.value)}
    //             />
    //             {clientErrors.quantity && <span>{clientErrors.quantity}</span>}
    //             <br />

    //             <label>Enter Description:</label>
    //             <textarea
    //                 value={description}
    //                 onChange={(e) => setDescription(e.target.value)}
    //             />
    //             {clientErrors.description && <span>{clientErrors.description}</span>}
    //             <br />

    //             <label>Select Category:</label>
    //             <select value={category} onChange={(e) => setCategory(e.target.value)}>
    //                 <option value=''>Select</option>
    //                 {categories?.map((ele) => (
    //                     <option value={ele._id} key={ele._id}>{ele.name}</option>
    //                 ))}
    //             </select>
    //             <br />

    //             <label>Is Approved:</label>
    //             <select value={isApproved} onChange={(e) => setIsApproved(e.target.value === 'true')}>
    //                 <option value=''>Select</option>
    //                 <option value='false'>False</option>
    //                 <option value='true'>True</option>
    //             </select>
    //             <br />

    //             <input type='submit' value='Create Product' />
    //         </form>
    //     </div>
    // )


    return (
        <div className="product-form-container">
            <h1 className="form-title">Create Product</h1>

            {serverErrors?.errors && (
                <div className="server-errors">
                    <p>These errors are prohibited from creating the product:</p>
                    <ul>
                        {serverErrors.errors.map((ele, i) => (
                            <li key={i}>{ele.msg}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit} className="product-form">
                <label>Enter Title:</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                {clientErrors.title && <span className="error-text">{clientErrors.title}</span>}

                <label>Enter Price:</label>
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-input"
                />
                {clientErrors.price && <span className="error-text">{clientErrors.price}</span>}

                <label>Enter Quantity:</label>
                <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-input"
                />
                {clientErrors.quantity && <span className="error-text">{clientErrors.quantity}</span>}

                <label>Enter product Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                />
                {clientErrors.description && <span className="error-text">{clientErrors.description}</span>}

                <label>Select Category:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"
                >
                    <option value=''>Select</option>
                    {categories?.map((ele) => (
                        <option value={ele._id} key={ele._id}>{ele.name}</option>
                    ))}
                </select>

                <label>Is Approved:</label>
                <select
                    value={isApproved}
                    onChange={(e) => setIsApproved(e.target.value === 'true')}
                    className="form-input"
                >
                    <option value=''>Select</option>
                    <option value='false'>False</option>
                    <option value='true'>True</option>
                </select>

                <input
                    type='submit'
                    value='Create Product'
                    className="submit-button"
                />
            </form>
        </div>
    )

}

export default CreateProduct
