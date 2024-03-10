import { React, useEffect, useState } from 'react'
import Layout from './Layout';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserProfile() {
    axios.defaults.withCredentials = true
    const [userData, setUserData] = useState({});
    const navigate = useNavigate()
    const toChangePassword = () => {
        navigate('/changePassword');
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}`)
            .then((res) => {
                if (res.data.loggedIn) {
                    setUserData({
                        username: res.data.username,
                        name: res.data.name,
                        email: res.data.email,
                        password: <button onClick={toChangePassword}>Change Password</button>,
                    })
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    return (
        <Layout>
            <table className="user-profile-table">
                <tbody>
                    {Object.entries(userData).map(([property, value]) => (
                        <tr key={property}>
                            <td className="property">{property}</td>
                            <td className="value">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>

    )
}

export default UserProfile
