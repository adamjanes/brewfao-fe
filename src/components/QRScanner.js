import React from 'react'
import { Typography } from '@material-ui/core'
import QrScan from 'react-qr-reader'

const QRScanner = ({ setData, setError }) => {
  const handleScan = data => {
    if (data) {
      setData(data)
    }
  }
  const handleError = err => {
    setError(err)
  }

  return (
    <div>
      <Typography variant="h5">
        Scan QR Code
      </Typography>
      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ height: 240, width: 320 }}
      />
    </div>
  )
}

export default QRScanner
