import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const Authentication = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export default Authentication