import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPencil,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [{
      component: CNavItem,
      name: 'Task Table',
      to: '/pages/task-table',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    }, {
      component: CNavItem,
      name: 'Register',
      to: '/pages/register',
      icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    }
    ],
  },
]

export default _nav
