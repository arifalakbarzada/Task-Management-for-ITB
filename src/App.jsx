import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, BrowserRouter, useNavigate, useLocation } from 'react-router-dom'

import { CSpinner } from '@coreui/react'
import './scss/style.scss'

import './scss/examples.scss'
import Login from './views/login/Login'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { departmentApiRequests, taskApiRequests, userApiRequests } from './services/base'
import { refreshUser, setAllUsers, setUser } from './toolkit/userSlice'
import { setAllDepartments } from './toolkit/departmentSlice'
import { setAllTasks } from './toolkit/taskSlice'
import { getUserByToken } from './toolkit/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))



const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.users.user)
  const refreshToken = localStorage.getItem('refreshToken')
  useEffect(() => {
      const fetchUser = async () => {
    if (!refreshToken) return;
    if (location.pathname === '/login') return;

    try {
      const resultAction = await dispatch(getUserByToken());
      const data = unwrapResult(resultAction);
      dispatch(setUser(data.user));
      navigate('/');
    } catch (err) {
      console.error("Token ile kullanıcı alınamadı, girişe yönlendiriliyor:", err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(refreshUser(null));
      navigate('/login');
    }
  };
  fetchUser();

  }, [])
  

  useEffect(() => {
    if (user?.role === 'admin') {
      departmentApiRequests.getAllDepartments().then(res => {
        dispatch(setAllDepartments(res))
      })
      userApiRequests.getAllUsers().then(res => {
        dispatch(setAllUsers(res))
      })
      taskApiRequests.getAllTasks().then(res => {
        dispatch(setAllTasks(res))
      })
    }

  }, [dispatch])
  return (
    <>
      <ToastContainer position="top-right" />
      <>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </>
    </>

  )
}

export default App
