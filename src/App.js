import React, { useState } from 'react'
import { Container, Typography, Grid, TextareaAutosize, Toolbar } from '@material-ui/core'

import Header from './components/Header'
import QRScanner from './components/QRScanner'

const App = () => {
  const [data, setData] = useState('No data')
  const [error, setError] = useState(null)

  return (
    <div className="App">
      <Header />
      <Toolbar style={{ height: '50px', minHeight: '50px' }} />
      <Container style={{ paddingTop: '10px' }} maxWidth="lg">
        <Typography variant="h5" style={{ padding: '15px 0px 10px 0px' }}>
          Scan QR Code
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <QRScanner setData={setData} setError={setError} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextareaAutosize
              style={{ fontSize: 18, width: '100%', height: 100 }}
              rowsMax={4}
              defaultValue={data}
              value={data}
            />
            {!!error && <p>{error}</p>}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
