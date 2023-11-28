import React from 'react'

import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';


function Settings() {
  // need to console log activity

  useEffect(() => {
    fetchInventoryData()
  }, [])

  // const {state} = useLocation();
  // console.log(state)

  const fetchInventoryData = () => {
    axios.get('http://localhost:8080/activity/3')
      .then((response) => {
        // console.log(response.data)
      }
      )

    // this activity have userId that is foreign key to user table and need to access user table to get user name
    axios.get('http://localhost:8080/activity/3/user')
      .then((response) => {
        // console.log(response.data.User)
      }
      )

      // need to get all device that have activityId = 3
      axios.get('http://localhost:8080/device/activity/3')
      .then((response) => {
        // console.log(response.data)
      }
      )
    
      

  }
  return (
    <div>
      Setting
    </div>
  )
}

export default Settings
