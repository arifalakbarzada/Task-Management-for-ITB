import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilPencil,
  cilSpeedometer,
  cilTask,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: "Admin"
  }
  ,
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: 'Task Table',
    to: '/admin/task-table',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  }, {
    component: CNavItem,
    name: 'Register',
    to: '/admin/register',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Edit Department',
    to: '/admin/editDepartment',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/admin/userManagement',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  }
]
export const userNav = [
  {
    component : CNavTitle,
    name: 'User'
  },
  {
    component: CNavItem,
    name: 'View Tasks',
    to: '/view-task',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
]

export default _nav
