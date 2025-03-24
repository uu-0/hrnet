import React from 'react'

import styled from 'styled-components'
import logo from '../assets/HRNet-logo.png'


const LogoResized = styled.img`
  width: 250px;
`

export default function Logo() {

  return (
    <LogoResized src={logo} alt='logo HRNet' />
  )
}