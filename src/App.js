
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
import { logout, fetchUserAccount, } from './slices/userSlice';
import { fetchCategories } from './slices/categorySlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AllUsers from './components/AllUsers';
import CreateCategory from './components/CreateCategory';
import AllCategories from './components/AllCategories';
import CreateProduct from './components/CreateProduct';



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


  useEffect(() => {  // to avoid page reload
    if (localStorage.getItem('token')) {
      dispatch(fetchCategories())
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
      {/* <h1 style={{ color: 'red' }} >classify  App</h1>
      <ul>

        {isLoggedIn ? (
          < >
            <li><Link to='/account' > Account </Link> </li>
            <li><Link to='/dashboard' > Dashboard </Link> </li>
            {data.role === 'admin' && <li> <Link to='/create-category' > create category</Link> </li>}
            {data.role === 'admin' && <li> <Link to='/list-category' > All categories</Link> </li>}
            {data.role === 'admin' && <li> <Link to='/all-users' >All buyers</Link> </li>}
            {data.role === 'seller' && <li> <Link to='/create-product' >create products</Link> </li>}
            {(data.role === 'seller' || data.role === 'admin') && (
              <li><Link to='/all-products'>All Products</Link></li>
            )}


            <li>  <button onClick={handleClick} > logout </button> </li>
          </>
        ) : (
          <>
            <li><Link to='/register' > Register </Link> </li>
            <li><Link to='/login' > Login </Link> </li>
          </>
        )}



      </ul> */}


      <header className="navbar">
        <h1 className="logo">Classify App</h1>
        <nav className="nav-links">
          <ul>
            {isLoggedIn ? (
              <>
                <li><Link to='/account'>Account</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                {data.role === 'admin' && (
                  <li className="dropdown">
                    Admin
                    <ul className="dropdown-menu">
                      <li><Link to='/create-category'>Create Category</Link></li>
                      <li><Link to='/list-category'>All Categories</Link></li>
                      <li><Link to='/all-users'>All Buyers</Link></li>
                    </ul>
                  </li>
                )}
                {data.role === 'seller' && (
                  <li className="dropdown">
                    Seller
                    <ul className="dropdown-menu">
                      <li><Link to='/create-product'>Create Product</Link></li>
                    </ul>
                  </li>
                )}
                {(data.role === 'seller' || data.role === 'admin') && (
                  <li><Link to='/all-products'>All Products</Link></li>
                )}
                <li><button onClick={handleClick}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>


      <Routes>
        <Route path='/dashboard' element={<PrivateRoute>  <Dashboard /> </PrivateRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<PrivateRoute> <Account /> </PrivateRoute>} />
        <Route path='/all-users' element={<PrivateRoute> <ProtectedRoute roles={['admin']} > <AllUsers /> </ProtectedRoute> </PrivateRoute>} />

        <Route path='/create-category' element={<PrivateRoute> <ProtectedRoute roles={['admin']} > <CreateCategory /> </ProtectedRoute> </PrivateRoute>} />
        <Route path='/list-category' element={<PrivateRoute> <ProtectedRoute roles={['admin', 'seller']} > <AllCategories /></ProtectedRoute> </PrivateRoute>} />
        <Route path='/unauthorized' element={<h2> sorry you dont have access to this page </h2>} />



        <Route path='/create-product' element={<PrivateRoute>  <ProtectedRoute roles={['seller']} > <CreateProduct /> </ProtectedRoute>  </PrivateRoute>} />
        <Route path='/all-products' element={<PrivateRoute> <ProtectedRoute roles={['seller', 'admin']} > <AllProducts /> </ProtectedRoute> </PrivateRoute>} />

      </Routes>

    </div >



  );
}

export default App;
