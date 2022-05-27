import React, { useContext } from 'react'
import { TextField, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

import { Context as AuthContext } from '../contexts/AuthContext'
import AuthLayout from '../layouts/AuthLayout'
import ErrorMessage from '../components/ErrorMessage'

const SignIn = () => {
  const navigate = useNavigate()
  const {
    state: { user: { loading, error } },
    signIn,
  } = useContext(AuthContext)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    const path = await signIn({ email, password })
    if (path) navigate(path)
  }

  return (
    <AuthLayout title="Sign In">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <LoadingButton
          loading={loading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <ErrorMessage>{error}</ErrorMessage>
      </Box>
    </AuthLayout>
  )
}

export default SignIn
