import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function CustomDatePicker({ id, name, value, onChange, minDate, maxDate, required }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        id={id}
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
                fontSize: '14px',
                fontFamily: 'Montserrat',
                fontOpticalSizing: 'auto',
                fontWeight: '400',
                fontStyle: 'normal', 
                minHeight:' 20px'
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}
