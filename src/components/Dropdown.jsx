import React, { useState } from 'react'

import styled from 'styled-components'
import { colors } from '../styles/colors'

const DropdownContainer = styled.div`
  position: relative;
  width: ${({ $width }) => $width || '100%'};
  z-index: 1000;
`

const DropdownButton = styled.div`
  width: 96%;
  padding: 16.5px 14px;
  margin: 10px 0 20px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: 18px;
  color: black;
  background-color: white;
  text-align: left;
  ${props => props.$isOpen && `border-color: ${colors.blue}`};
  cursor: pointer;
  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  }
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  width: ${({ $width }) => $width || '60%'};
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const DropdownItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.blue};
    color: white;
  }
`

export default function Dropdown({ options, selected, onSelect, required, formSubmitted, width }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(!isOpen)
  }

  function handleSelect(option) {
    onSelect(option)
    setIsOpen(false)
  }

  const hasError = formSubmitted && required && !selected;

  return (
    <DropdownContainer $width={width}>
      <DropdownButton $isOpen={isOpen} $hasError={hasError} onClick={handleToggle}>
        {hasError ? <span style={{ color: 'red' }}>This field is required</span> : selected || options[0]}
      </DropdownButton>
      {isOpen && (
        <DropdownList $width={width}>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  )
}
