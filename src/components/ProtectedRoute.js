import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"



export default function ProtectedRoute(props) {
    const { data } = useSelector(state => state.user)
    if (props.roles.includes(data.role)) {
        return props.children
    } else {
        return <Navigate to='/unauthorized' />
    }
}