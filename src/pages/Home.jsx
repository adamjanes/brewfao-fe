import React, { useState, useContext } from 'react'
import { Container, Typography, Grid, TextareaAutosize, Toolbar } from '@mui/material'

import { Context as ClaimsContext } from '../contexts/ClaimsContext'
import Header from '../components/Header'
import QRScanner from '../components/QRScanner'
import ScanResultDialog from '../components/ScanResultDialog'

const Home = ({ signOut }) => {
  const {
    state: { data, validation, refinedAddress },
    validateETHAddress,
    postClaim,
  } = useContext(ClaimsContext)
  const [qrData, setQrData] = useState('Scan to show data...')
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const handleScan = address => {
    if (address) {
      // for text box
      setQrData(address)
      validateETHAddress({ address, data: data.value })
      setOpen(true)
    }
  }

  const handleConfirm = () => {
    postClaim({ refinedAddress, data: data.value })
    setQrData('Scan to show data...')
    setOpen(false)
  }

  const handleDeny = () => {
    setQrData('Scan to show data...')
    setOpen(false)
  }

  return (
    <>
      <Header signOut={signOut} />
      <Toolbar />
      <Container style={{ paddingTop: '10px' }} maxWidth="lg">
        <Typography variant="h5" style={{ padding: '15px 0px 10px 0px' }}>
          Scan QR Code
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <QRScanner handleScan={handleScan} setError={setError} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextareaAutosize
              style={{ fontSize: 18, width: '100%', height: 100 }}
              maxRows={4}
              value={qrData}
            />
            {!!error && <p>{error}</p>}
          </Grid>
        </Grid>
      </Container>
      {!!validation.message && (
        <ScanResultDialog
          approved={validation.value}
          message={validation.message}
          open={open}
          setOpen={setOpen}
          handleConfirm={handleConfirm}
          handleDeny={handleDeny}
        />
      )}
    </>
  )
}

export default Home
