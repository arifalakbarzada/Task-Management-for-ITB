import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../routes'
import { userRoutes } from '../routes'
import { useSelector } from 'react-redux'

const AppContent = () => {
  const user = useSelector((state)=>state.users.user)
  const { accessToken, refreshToken, isAuthenticated } = useSelector(state => state.auth);
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {
            user?.role === 'admin' ? 
          routes.map((route, idx) => {
            return (<>
              {route.element && (
               
               <Route
                  key={idx+route.name}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />)}
                <Route path='*' element = {<Navigate to = "/admin/dashboard" />} />
               </> 
            )
          })
          : 
          user?.role === 'user' ? userRoutes.map((route, idx) => {
            return (
              <>
               {route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />)}
                <Route path='*' element = {<Navigate to = "/view-task" />} />
              </>
             
              )
})
           : <Route path='*' element = {< Navigate to = '/login' />}/>
        
          }
          {user?.role === 'admin' ?<Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> : user?.role === 'user' ? <Route path='/' element = {<Navigate to={'/view-task'} />} /> : null}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
