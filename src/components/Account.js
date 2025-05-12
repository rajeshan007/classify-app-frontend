import { useSelector } from "react-redux"
import './account.css'
export default function Account() {
    const { data } = useSelector(state => state.user)



    if (!data) return false // show component only if data is present
    return (
        // <div className="useraccount" >
        //     <h1> welcome  {data.username} ! </h1>
        //     <p> email - {data.email} </p>
        //     <p> role - {data.role}</p>
        // </div>

        <div className="user-account">
            <h1>Welcome, {data.username}!</h1>
            <p>Email: <span>{data.email}</span></p>
            <p>Role: <span>{data.role}</span></p>
        </div>


    )
}