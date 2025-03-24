import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

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
  width: 1000px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Tilte = styled.h1`
  color: black;
  font-size: 22px;
`

const Back = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

export default function EmployeeList() {

  const employees = useSelector((state) => state.employees)
  const navigate = useNavigate()
  
  return (
    <Page>
      <HRNetLogo />
      <Container>
      <Header>
          <Tilte>employee list</Tilte>
          <Back onClick={() => navigate('/CreateEmployee')}>back</Back>
        </Header>
        <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.firstName} {employee.lastName} - {employee.department}
          </li>
        ))}
      </ul>
      </Container>
    </Page>
  )
}

