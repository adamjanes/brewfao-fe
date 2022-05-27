import React from 'react'
import QrScan from 'react-qr-reader'

const QRScanner = ({ handleScan, setError }) => {
  const handleError = err => {
    setError(err)
  }

  return (
    <div>
      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  )
}

export default QRScanner
