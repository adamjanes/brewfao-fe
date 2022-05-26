import React, { useState } from 'react'
import { Menu, MenuItem } from '@material-ui/core'

const HeaderMenu = ({ signOut }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default HeaderMenu
