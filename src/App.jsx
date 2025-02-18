import React, { Suspense, useEffect } from 'react'
import { Route, Routes , BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import './scss/examples.scss'
import Login from './views/login/Login'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))



const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  return (
    <>
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
          <Route path='/login' element = {<Login />}/>
        </Routes>
      </Suspense>
    </BrowserRouter> 
    </>
    
  )
}

export default App
