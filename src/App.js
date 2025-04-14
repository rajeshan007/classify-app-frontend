
import './App.css';
import { Routes, Route, Link } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Dashboard from './components/Dashboard'
import MyProducts from './components/MyProducts';
import AllProducts from './components/AllProducts';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchUserAccount } from './slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AllUsers from './components/AllUsers';
import CreateCategory from './components/CreateCategory';
import AllCategories from './components/AllCategories';



function App() {

  const { isLoggedIn, data } = useSelector((state) => {
    return state.user
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {  // to avoid page reload
    if (localStorage.getItem('token')) {
      dispatch(fetchUserAccount())
    }
  }, [dispatch])


  const handleClick = (e) => {
    e.preventDefault()
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')

  }




  return (
    <div className="App">
      <h1 style={{ color: 'red' }} >classify  App</h1>
      <ul>

        {isLoggedIn ? (
          < >
            <li><Link to='/account' > Account </Link> </li>
            <li><Link to='/dashboard' > Dashboard </Link> </li>
            <li> <Link to='/create-category' > create category</Link> </li>
            <li> <Link to='/list-category' > All categories</Link> </li>

            {data.role === 'admin' && <li> <Link to='/all-users' >All buyers</Link> </li>}


            <li>  <button onClick={handleClick} > logout </button> </li>
          </>
        ) : (
          <>
            <li><Link to='/register' > Register </Link> </li>
            <li><Link to='/login' > Login </Link> </li>
          </>
        )}



      </ul>


      <Routes>
        <Route path='/dashboard' element={<PrivateRoute>  <Dashboard /> </PrivateRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-category' element={<CreateCategory />} />
        <Route path='/account' element={<PrivateRoute> <Account /> </PrivateRoute>} />
        <Route path='/unauthorized' element={<h2> sorry you dont have access to this page </h2>} />
        <Route path='/all-users' element={<PrivateRoute> <ProtectedRoute roles={['admin']} > <AllUsers /> </ProtectedRoute> </PrivateRoute>} />
        <Route path='/list-category' element={<AllCategories/>} />

      </Routes>

    </div>
  );
}

export default App;
