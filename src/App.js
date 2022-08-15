import React, { useState, useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from './firebase'
import { Context as ClaimsContext } from './contexts/ClaimsContext'
import { Context as AuthContext } from './contexts/AuthContext'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import LoadingPage from './components/LoadingPage'

const App = () => {
  const { getClaims } = useContext(ClaimsContext)
  const { signOut } = useContext(AuthContext)
  const [loggedIn, setLoggedIn] = useState(true)
  const [loggedInLoading, setLoggedInLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (firstLoad) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setLoggedIn(true)
          setLoggedInLoading(false)
          getClaims()
        } else {
          setLoggedIn(false)
          setLoggedInLoading(false)
        }
      })
      setFirstLoad(false)
    }
  }, [getClaims, firstLoad])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            loggedInLoading ? (
              <LoadingPage />
            ) : loggedIn ? (
              <Home signOut={signOut} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
