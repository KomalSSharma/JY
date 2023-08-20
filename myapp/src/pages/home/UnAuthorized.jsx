import React from 'react'
import { Link } from 'react-router-dom'

function UnAuthorized() {
  return (
    <>
    <h1>UnAuthorized access</h1>
    <Link to='/'> Home</Link>
    </>
    
  )
}

export default UnAuthorized