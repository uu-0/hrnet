import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../styles/colors'

import HRNetLogo from '../components/Logo'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 650px;
  display: flex;
  flex-direction: column;
  flex-direction: center;
  align-items: center;
  gap: 30px;
`

const Welcome = styled.h1`
  font-size: 25px;
`

const Button = styled.button`
  width: 33%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: ${colors.orange};
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${colors.purple};
  }
`

export default function Home() {
  const navigate = useNavigate()

  return (
    <Page>
      <HRNetLogo />
      <Container>
        <Welcome>welcome</Welcome>
        <Button onClick={() => navigate('/CreateEmployee')}>create employee</Button>
        <Button onClick={() => navigate('/EmployeeList')}>employee list</Button>
      </Container>
    </Page>
  )
}
