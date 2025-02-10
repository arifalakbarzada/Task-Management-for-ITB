import React, { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const TaskTable = lazy(() => import('./views/TaskTable/TaskTable'))
const Register = lazy(() => import('./views/register/Register'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/pages/task-table', name: 'Task Table', element: TaskTable },
  { path: '/pages/register', name: "Register" , element : Register}

]

export default routes
