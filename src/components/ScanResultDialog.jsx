import React from 'react'
import { Dialog, DialogContent, Typography, Button, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import BlockIcon from '@mui/icons-material/Block'

const ScanResultDialog = ({ approved, message, open, setOpen, handleConfirm, handleDeny }) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={() => setOpen(false)}>
      <DialogContent>
        <Box
          sx={{
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {approved ? (
            <CheckCircleIcon color="success" sx={{ fontSize: 142 }} />
          ) : (
            <BlockIcon color="error" sx={{ fontSize: 142 }} />
          )}
          <Typography variant="h6">{approved ? 'Approved' : 'Denied'}</Typography>
          <Typography variant="body1" textAlign="center">
            {message}
          </Typography>
          {approved ? (
            <>
              <Button
                variant="contained"
                sx={{ marginTop: '15px' }}
                fullWidth
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button
                variant="outlined"
                sx={{ marginTop: '15px' }}
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" sx={{ marginTop: '15px' }} fullWidth onClick={handleDeny}>
              Close
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ScanResultDialog
