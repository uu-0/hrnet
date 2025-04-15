import React from 'react'

import styled from 'styled-components'

import { montserratFont } from '../styles/font'
import { colors } from '../styles/colors'
import { device } from '../styles/media'

//label de l'input
const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: bold;
  color: black;
  @media ${device.mobileL} {
  font-size: 12px;
  }
`
//input
const StyledInput = styled.input`
  width: 94%;
  padding: 16.5px 14px;
  margin: 10px 0 20px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: 13px;
  color: black;
  ${montserratFont};
  &::placeholder {
    color: ${({ $hasError }) => ($hasError ? 'red' : '#aaa')};
  }
  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : colors.blue)};
    outline: none;
  }
  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  }
  @media ${device.tablet} {
    width: 91%;
  }
  @media ${device.mobileL} {
    width: 89%;
  }
`

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  hasError = false,
  placeholder,
  min
}) {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        $hasError={hasError}
        placeholder={hasError ? placeholder || 'This field is required' : undefined}
        min={min}
      />
    </>
  )
}
