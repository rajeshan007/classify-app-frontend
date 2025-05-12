import { useState, useEffect } from 'react'
import axios from '../config/axios'
import { useSelector, } from 'react-redux'
import './allproducts.css'

export default function AllProducts() {
    const [products, setProducts] = useState([])
    const [serverErrors, setServerErrors] = useState(null)
    const { categories } = useSelector(state => state.category)

    const { data } = useSelector(state => state.user)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/list-products', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setProducts(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchProducts()
    }, [])

    // Helper function to get category name by ID
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId)
        return category ? category.name : 'N/A'
    }


    const handleDelete = async (id) => {
        const confirm = window.confirm('are you sure?')
        if (confirm) {
            try {
                await axios.delete(`/api/deleteProduct/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })

                // Remove the deleted product from the local state
                setProducts(prev => prev.filter(product => product._id !== id))
            } catch (e) {
                setServerErrors(e.response?.data?.errors || 'Something went wrong')
            }
        }

    }





    return (
        // <div>


        //     <h1>Total Products - {products.length}</h1>

        //     {serverErrors && <p>{serverErrors}</p>}

        //     {products.length === 0 ? (
        //         <p>No products available</p>
        //     ) : (
        //         <table border='1px' >
        //             <thead>
        //                 <tr>
        //                     <th>Title</th>
        //                     <th>Price/kg </th>
        //                     <th>Quantity</th>
        //                     <th>Category</th>
        //                     <th>Approved</th>
        //                     {data.role === "admin" && <th>actions</th>}


        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {products?.map((product) => (
        //                     <tr key={product._id}>
        //                         <td>{product.title}</td>
        //                         <td>{product.price}</td>
        //                         <td>{product.quantity}</td>
        //                         <td>{getCategoryName(product.category)}</td>
        //                         <td>{product.isApproved ? 'Yes' : 'No'}</td>
        //                         {data.role === 'admin' && (
        //                             <td>
        //                                 <button onClick={() => handleDelete(product._id)}>Delete product</button>

        //                             </td>
        //                         )}




        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     )}
        // </div>

        <div className="product-list-container">
            <h1 className="product-heading">Total Products - {products.length}</h1>

            {serverErrors && <p className="error-msg">{serverErrors}</p>}

            {products.length === 0 ? (
                <p className="empty-state">No products available</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price/kg</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Approved</th>
                            {data.role === "admin" && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{getCategoryName(product.category)}</td>
                                <td>{product.isApproved ? 'Yes' : 'No'}</td>
                                {data.role === 'admin' && (
                                    <td>
                                        <button className="btn delete-btn" onClick={() => handleDelete(product._id)}>
                                            Delete Product
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>

    )
}
