import {React, useState, useEffect, useRef} from 'react'
import axios from 'axios';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.REACT_APP_API}/login/`, {
            username,
            password,
        });
        if (res.data.Login) {
            console.log(res.data);
        } else {
            console.log(res.data);
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" onChange={(e) => {
            setUsername(e.target.value);
        }}/>
        <label>Password</label>
        <input type="password" onChange={(e) => {
            setPassword(e.target.value);
        }}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
