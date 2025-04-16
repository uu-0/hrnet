import React from 'react'

import styled from 'styled-components'
import logo from '/HRNet-logo.webp'


const LogoResized = styled.img`
  width: 250px;
  height: 104px;
`

export default function Logo() {

  return (
    <LogoResized src={logo} alt='logo HRNet' />
  )
}