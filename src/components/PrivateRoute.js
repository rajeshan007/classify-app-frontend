import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute(props) {
    const { data } = useSelector(state => state.user)

    if (localStorage.getItem('token') && data) {
        return props.children
    } else if (localStorage.getItem('token')) {
        return false
    } else {
        return <Navigate to='/login ' />
    }


}