import { element } from 'prop-types'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Dashboard = lazy(() => import('./views/admin/dashboard/Dashboard'))
const TaskTable = lazy(() => import('./views/admin/TaskTable/TaskTable'))
const Register = lazy(() => import('./views/admin/register/Register'))
const EditDepartment = lazy(() => import('./views/admin/edit-department/EditDepartment'))
const ViewTask = lazy(() => import('./views/user/Task View/TaskView'))
const TaskManagement = lazy(() => import('./views/admin/User Management/UserManagement'))

const routes = [
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/task-table', name: 'Task Table', element: TaskTable },
  { path: '/admin/register', name: "Register", element: Register },
  { path: '/admin/editDepartment', name: "Edit Department", element: EditDepartment },
  { path: '/admin/usermanagement', name: 'User Management', element: TaskManagement }
]
export const userRoutes = [
  { path: '/view-task', name: 'View Task', element: ViewTask }
]
export default routes
