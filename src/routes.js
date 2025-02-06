import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(()=>import('./views/login/Login'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path : '/buttons/login' ,name : 'Login' , element : Login} , 
  
]

export default routes
