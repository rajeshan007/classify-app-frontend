import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, deleteCategory, setEditId } from '../slices/categorySlice'
import { useNavigate, Link } from 'react-router-dom'
import './allcategories.css'


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

    // return (
    //     <div>
    //         <h1>Total Categories - {categories.length}</h1>
    //         <table border="1px">
    //             <thead>
    //                 <tr>
    //                     <th>Name</th>
    //                     <th>Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {categories.map((ele) => (
    //                     <tr key={ele._id}>
    //                         <td><b>{ele.name}</b></td>
    //                         <td>
    //                             <button onClick={() => handleDelete(ele._id)}>Delete</button>
    //                             <button onClick={() => handleEdit(ele._id)}>Edit</button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>


    //     </div>
    // )


    return (
        <div className="category-list-container">
          <h1 className="category-heading">Total Categories - {categories.length}</h1>
      
          <table className="category-table">
            <thead>
              <tr>
                <th> category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((ele) => (
                <tr key={ele._id}>
                  <td><b>{ele.name}</b></td>
                  <td>
                    <button className="btn delete-btn" onClick={() => handleDelete(ele._id)}>Delete</button>
                    <button className="btn edit-btn" onClick={() => handleEdit(ele._id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      
}

export default AllCategories