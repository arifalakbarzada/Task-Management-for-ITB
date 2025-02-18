import React, { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'))
const TaskTable = lazy(() => import('./views/TaskTable/TaskTable'))
const Register = lazy(() => import('./views/register/Register'))
const EditDepartment = lazy(() => import('./views/edit-department/EditDepartment'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/pages/task-table', name: 'Task Table', element: TaskTable },
  { path: '/pages/register', name: "Register" , element : Register},
  {path : '/pages/editDepartment' , name : "Edit Department" , element : EditDepartment}

]

export default routes
