import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../config"


const Users = () => {
    const [userData, setUserData] = useState([])
    const getUserData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user`)
            setUserData(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div>
            <h2>Users : {userData.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            userData?.map(user => <tr key={userData._id} className="border-black">
                                <th>1</th>
                                <td>{user.email}</td>
                                <td>{user.createdAt}</td>
                                <td>Blue</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
