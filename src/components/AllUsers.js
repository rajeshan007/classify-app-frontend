import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchAllUsers } from '../slices/userSlice'

const AllUsers = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])


    const handleDelete = (id) => {
        const confirm = window.confirm('are you sure?')
        if (confirm) {
            dispatch(deleteUser(id))
        }

    }

    return (
        <div>
            <h1>total buyers -{users.length}   </h1>



            <table border='1px'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((ele) => (
                        <tr key={ele._id}>
                            <td>{ele.username}</td>
                            <td>{ele.email}</td>
                            <td>{ele.role}</td>
                            <td>
                                <button onClick={() => handleDelete(ele._id)}>
                                    Delete User
                                </button>
                            </td>
                            <td> {ele.status} </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}

export default AllUsers