import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, BrowserRouter, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import './scss/examples.scss'
import Login from './views/login/Login'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { departmentApiRequests, taskApiRequests, userApiRequests } from './services/base'
import { setAllUsers, setUser } from './toolkit/userSlice'
import { setAllDepartments } from './toolkit/departmentSlice'
import { setAllTasks } from './toolkit/taskSlice'
import { loginSuccess } from './toolkit/authSlice'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))



const App = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken, isAuthenticated } = useSelector(state => state.auth);
  // const navigate = useNavigate()
  const user = useSelector((state) => state.users.user)
  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
    if (user.role === 'admin') {
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
  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');

  //   if (accessToken && refreshToken) {
  //     dispatch(loginSuccess({ accessToken, refreshToken }));
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   if (refreshToken) {
  //     // dispatch(refreshAccessToken(refreshToken));
  //   }
  // }, [dispatch, refreshToken]);
  return (
    <>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route path='/login' element={isAuthenticated ? <Navigate to={'/'} /> : <Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>

  )
}

export default App
