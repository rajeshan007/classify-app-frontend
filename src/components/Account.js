import { useSelector } from "react-redux"
export default function Account() {
    const { data } = useSelector(state => state.user)
   

    if (!data) return false // show component only if data is present
    return (
        <div>
            <h1> user Account</h1>
            <p> email - {data.email} </p>
            <p> role - {data.role}</p>
        </div>
    )
}