import { useState, useEffect } from 'react'
import axios from '../config/axios'
import { useSelector } from 'react-redux'

export default function AllProducts() {
    const [products, setProducts] = useState([])
    const { categories } = useSelector(state => state.category)

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

    return (
        <div>
            <h1>Total Products - {products.length}</h1>

            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <table border='1px' cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Approved</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
