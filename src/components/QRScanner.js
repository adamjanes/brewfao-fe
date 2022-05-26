import React from 'react'
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
      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  )
}

export default QRScanner
