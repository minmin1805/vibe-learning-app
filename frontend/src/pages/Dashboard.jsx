import React, { useEffect, useState } from 'react'
import TopNavBar from '../components/TopNavBar'
import { auth } from '../services/api'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()


  useEffect(() => {
    // Optionally, fetch latest profile from backend
    async function fetchProfile() {
      try {
        const res = await auth.getProfile()
        setUser(res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user))
      } catch (err) {
        console.log(err);
        alert("Error fetching profile");
        navigate("/login");
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className='bg-blue-50 h-screen'>
      <TopNavBar user={user} />
    </div>
  )
}

export default Dashboard
