import React from 'react'

import styled from 'styled-components'

import { montserratFont } from '../styles/font'
import { colors } from '../styles/colors'

const Label = styled.label`
  font-size: 17px;
  display: block;
  font-weight: bold;
  color: black;
`

const StyledInput = styled.input`
  width: 96%;
  padding: 16.5px 14px;
  margin: 10px 0 20px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: 18px;
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
