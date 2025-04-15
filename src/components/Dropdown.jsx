import React, { useState } from 'react'

import styled, { css } from 'styled-components'
import { colors } from '../styles/colors'
import { device } from '../styles/media'

//label du dropdown
const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: bold;
  color: black; 
  @media ${device.mobileL} {
  font-size: 12px;
  }
`
//container du dropdown
const DropdownContainer = styled.div`
  position: relative;
  width: 98%;
  z-index: 1000;
  @media ${device.tablet} {
    width: 95%;
  }
  @media ${device.mobileL} {
    width: 93%;
  }
`
//bouton du dropdown
const DropdownButton = styled.div`
  width: 96%;
  padding: 12px 14px;
  margin: 10px 0 20px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: 14px;
  color: black;
  background-color: white;
  text-align: left;
  ${props => props.$isOpen && `border-color: ${colors.blue}`};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  }
`
//liste du dropdown
const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: 60%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  font-size: 13px;
  list-style-type: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`
//item de la liste du dropdown
const DropdownItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.blue};
    color: white;
  }
`
//îcone triangle
const Triangle = styled.span`
  align-item: right;
  display: inline-block;
  font-size: 20px;
  color: #999;
  transform: rotate(0deg);
  transition: transform 0.2s ease, color 0.2s ease;

  ${({ $active, $direction }) =>
    $active &&
    css`
      color: ${colors.blue};
      transform: rotate(${($direction === 'asc' || $direction === 'desc') ? '180deg' : '0deg'});
    `}
`

export default function Dropdown({ options, selected, onSelect, required, formSubmitted, label }) {
  const [isOpen, setIsOpen] = useState(false)

  //fonction pour modifier l'état d'ouverture du dropdown
  function handleToggle() {
    setIsOpen(!isOpen)
  }

  //fonction pour séléctionner une otpion de la liste
  function handleSelect(option) {
    onSelect(option)
    setIsOpen(false)
  }

  //vérifie que le champ du dropdown est valide ou non
  const hasError = formSubmitted && required && !selected

  return (
    <>
      <Label htmlFor={options}>{label}</Label>
      <DropdownContainer>
        <DropdownButton $isOpen={isOpen} $hasError={hasError} onClick={handleToggle}>
          <span>{hasError ? <span style={{ color: 'red', fontSize: '13px' }}>This field is required</span> : selected || " "}</span>
          <Triangle $active={isOpen} $direction={isOpen ? 'asc' : 'desc'}>⏷</Triangle>
        </DropdownButton>
        {isOpen && (
          <DropdownList>
            {options.map((option, index) => (
              <DropdownItem key={index} onClick={() => handleSelect(option)}>
                {option}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </>
  )
}
