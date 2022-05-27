import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const Header = ({ signOut }) => (
  <AppBar
    dense="true"
    position="fixed"
  >
    <Toolbar>
      {/* <img style={{ width: '26px' }} src="/logo.png" alt="BrewDAO Logo" /> */}
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flex: 1, paddingLeft: '7px', fontSize: '16px', fontWeight: 700 }}
      >
        BrewDAO
      </Typography>
      <Button
        variant="text"
        onClick={() => {
          signOut()
        }}
        color="inherit"
      >
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)

export default Header
