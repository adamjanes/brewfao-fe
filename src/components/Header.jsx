import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import HeaderMenu from './HeaderMenu'

const Header = ({ username }) => (
  <AppBar
    dense="true"
    position="fixed"
    sx={{ zIndex: theme => theme.zIndex.drawer + 1, height: '50px', backgroundColor: '#000000' }}
  >
    <Toolbar style={{ height: '50px', minHeight: '50px' }}>
      {/* <img style={{ width: '26px' }} src="/logo.png" alt="BrewDAO Logo" /> */}
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, paddingLeft: '7px', fontSize: '16px', fontWeight: 700 }}
      >
        BrewDAO
      </Typography>
      <HeaderMenu username={username} signOut={() => {}} />
    </Toolbar>
  </AppBar>
)

export default Header
