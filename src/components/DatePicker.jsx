import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { montserratFont } from '../styles/font'

export default function CustomDatePicker({ name, value, onChange, minDate, maxDate, required }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        name={name}
        value={ value || null }
        onChange={(date) => onChange(date ? date.toISOString().split('T')[0] : '')}
        minDate={minDate ? new Date(minDate) : null}
        maxDate={maxDate ? new Date(maxDate) : null}
        format="dd/MM/yyyy"
        slotProps={{
          textField: {
            fullWidth: true,
            required: required,
            sx: {
              '& .MuiInputBase-root': {
                margin: '10px 0 20px 0',
                borderRadius: '5px',
                fontSize: '16px',
                montserratFont
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}
