import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { users } = useSelector(state => state.user)
  const { categories, } = useSelector(state => state.category)
  return (
    <div>
      <h1>Dashboard</h1>
      <h2> total users - {users.length} </h2>
      <h2>  total categories - {categories.length} </h2>
    </div>
  )
}

export default Dashboard