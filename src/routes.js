import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Login = React.lazy(() => import('./views/login/Login'))
const TaskTable = React.lazy(()=>import('./views/TaskTable/TaskTable'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/pages/login', name: 'Login', element: Login },
  { path: '/pages/task-table', name: 'TaskTable', element: TaskTable },

]

export default routes
