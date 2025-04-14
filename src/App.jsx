import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import './scss/examples.scss'
import Login from './views/login/Login'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { departmentApiRequests, taskApiRequests, userApiRequests } from './services/base'
import { setAllUsers } from './toolkit/userSlice'
import { setAllDepartments } from './toolkit/departmentSlice'
import { setAllTasks } from './toolkit/taskSlice'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    departmentApiRequests.getAllDepartments().then(res => {
      dispatch(setAllDepartments(res))
    })
    userApiRequests.getAllUsers().then(res => {
      dispatch(setAllUsers(res))
    })
    taskApiRequests.getAllTasks().then(res => {
      dispatch(setAllTasks(res))
    })
  }, [dispatch])
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
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>

  )
}

export default App
