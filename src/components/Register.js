import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isEmail } from "validator"
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <h1>  register with us</h1>
            {serverErrors &&
                <>
                    <h3> these errors are prohibitted from the user being saved</h3>
                    {serverErrors.map((ele, i) => {
                        return <li key={i} > {ele.msg} </li>
                    })}

                </>
            }

            <form onSubmit={handleSubmit} >
                <label htmlFor='username' > <b> enter name :</b>  </label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id='username'
                />  {clientErrors.username && <span>{clientErrors.username}</span>}  <br />
                <label htmlFor='email' > <b> enter email :</b></label>
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                /> {clientErrors.email && <span>{clientErrors.email}</span>} <br />
                <label htmlFor='password' > <b> enter password :</b></label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                />  {clientErrors.password && <span>{clientErrors.password}</span>} <br />

                <label> <b> select status  </b> </label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value='' > select status </option>
                    <option value='active' > active </option>
                    <option value='deactive' >deactive</option>
                </select> <br />

                <lable> <b>select role : </b> </lable>
                <input
                    type='radio'
                    value='buyer'
                    checked={role === 'buyer'}
                    onChange={(e) => { setRole(e.target.value) }}
                    name='role'
                    id='buyer'
                /> <label htmlFor='buyer' > buyer </label>
                <input
                    type='radio'
                    value='seller'
                    checked={role === 'seller'}
                    onChange={(e) => { setRole(e.target.value) }}
                    name='role'
                    id='seller'
                /> <label htmlFor='seller' > seller </label>
                <input
                    type='radio'
                    value='admin'
                    checked={role === 'admin'}
                    onChange={(e) => { setRole(e.target.value) }}
                    name='role'
                    id='admin'
                /> <label htmlFor='admin' > admin </label> <br />


                <input type='submit' />

            </form>
            <b>alread registerd?</b> <Link to='/login' > login here </Link>
        </div>
    )
}