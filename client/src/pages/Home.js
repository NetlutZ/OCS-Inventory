import { React, useState, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [value, setValue] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        if(res.data.loggedIn){
          navigate('/dashboard')
        }else{
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    axios.post(`${process.env.REACT_APP_API}/login`, value)
      .then((res) => {
        console.log(res.data)
        if (res.data.Login) {
          navigate('/dashboard')
        } else {
          console.log('Username or Password is incorrect')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Left Column for Photo */}
      <div style={{ flex: '70%' }}>
        <img src="https://www.shipbob.com/wp-content/uploads/2021/07/inventory-vs-stock-.jpg" alt="Your Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Right Column for Login Form */}
      <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '2rem', paddingLeft: '2rem' }}>
        <div>
          <img src="https://www.shipbob.com/wp-content/uploads/2021/07/inventory-vs-stock-.jpg" alt="Your Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <form style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
            {/* Your login form components go here */}
            <label style={{ marginBottom: '0.1rem' }}>Username</label>
            <input className='device-data-input' onChange={handleInput} type="text" name="username" style={{ marginBottom: '1rem' }} />

            <label style={{ marginBottom: '0.1rem' }}>Password</label>
            <input className='device-data-input' onChange={handleInput} type="password" name="password" />

            <button type="submit" style={{ width: '100%', marginTop: '8px' }}>Login</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Home
