import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { PostService } from './services/PostService'
import { setAxiosInstanceToken } from './services/axiosInstance'

const App = () => {
  const navigate = useNavigate();
  const handleCheckToken = async () => {
    try {
      await PostService.getCurrentUserPosts();
      setAxiosInstanceToken(localStorage.getItem('token'))
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, [])
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App