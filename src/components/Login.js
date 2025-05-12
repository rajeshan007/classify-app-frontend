import { useState } from "react"
import { isEmail } from 'validator'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import { useDispatch, } from "react-redux"
import { login } from "../slices/userSlice"
import './login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [clientErrors, setClientErrors] = useState({})
    const [serverErrors, setServerErrors] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = {}
        if (email.trim().length === 0) {
            errors.email = 'email is required'
        } else if (!isEmail(email)) {
            errors.email = 'invalid email'
        }
        if (password.trim().length === 0) {
            errors.password = 'password is required'
        }

        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            const formData = {
                email,
                password
            }
            try {
                const response = await axios.post('/login', formData)
                localStorage.setItem('token', response.data.token)
                const accountResponse = await axios.get('/user/account', { headers: { Authorization: localStorage.getItem('token') } })
                dispatch(login(accountResponse.data))
                navigate('/account')
                // console.log(accountResponse.data);
            } catch (e) {
                console.log(e);
                setServerErrors(e.response.data.errors)
            }
        }
    }

    return (
        <div className="login-container">
        <h1>Login with us</h1>
      
        {serverErrors && (
          <div className="error-list">
            <h3>These errors prevented login:</h3>
            {serverErrors.map((ele, i) => (
              <li key={i}>{ele.msg}</li>
            ))}
          </div>
        )}
      
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            name="email"
          />
          {clientErrors.email && <span>{clientErrors.email}</span>}
      
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            name="password"
          />
          {clientErrors.password && <span>{clientErrors.password}</span>}
      
          <input type="submit" value="Login" />
        </form>
      
        <div className="link-text">
          <b>New user?</b> <Link to="/register">Register here</Link>
        </div>
      </div>
      
    )
}