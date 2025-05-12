import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isEmail } from "validator"
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'
import './register.css'


export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors, setServerErrors] = useState(null)

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        // const formData = {
        //     username,
        //     email,
        //     password,
        //     role,
        //     status
        // }

        // try {
        //     const response = await axios.post('/register', formData)
        //     console.log(response.data);
        // } catch (e) {
        //     console.log(e);
        //     setServerErrors(e.response.data.errors)
        // }


        const errors = {}
        if (username.trim().length === 0) {
            errors.username = 'username is required'
        }
        if (email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!isEmail(email)) {
            errors.email = 'invalid email'
        }
        if (password.trim().length === 0) {
            errors.password = 'password is required'
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'password should be 8 to 128 characters'
        }


        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            const formData = {
                username,
                email,
                password,
                role,
                status
            }
            try {
                const response = await axios.post('/register', formData)
                navigate('/login')

            } catch (e) {
                setServerErrors(e.response.data.errors)
                setClientErrors({})
            }

        }
    }


    useEffect(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('')
        setStatus('')
    }, [])




    return (
        <div className="register-container">
        <h1>register with us</h1>
      
        {serverErrors && (
          <div className="error-list">
            <h3>These errors prevented registration:</h3>
            {serverErrors.map((ele, i) => (
              <li key={i}>{ele.msg}</li>
            ))}
          </div>
        )}
      
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Enter name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
            {clientErrors.username && <span>{clientErrors.username}</span>}
          </div>
      
          <div>
            <label htmlFor="email">Enter email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            {clientErrors.email && <span>{clientErrors.email}</span>}
          </div>
      
          <div>
            <label htmlFor="password">Enter password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
            {clientErrors.password && <span>{clientErrors.password}</span>}
          </div>
      
          <div>
            <label>Select status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
      
          <div>
            <label>Select role:</label><br />
            <input
              type="radio"
              value="buyer"
              checked={role === 'buyer'}
              onChange={(e) => setRole(e.target.value)}
              name="role"
              id="buyer"
            /> <label htmlFor="buyer">Buyer</label>
      
            <input
              type="radio"
              value="seller"
              checked={role === 'seller'}
              onChange={(e) => setRole(e.target.value)}
              name="role"
              id="seller"
            /> <label htmlFor="seller">Seller</label>
      
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
              name="role"
              id="admin"
            /> <label htmlFor="admin">Admin</label>
          </div>
      
          <input type="submit" value="Register" />
        </form>
      
        <div className="link-text">
          <b>Already registered?</b> <Link to="/login">Login here</Link>
        </div>
      </div>
      
    )
}