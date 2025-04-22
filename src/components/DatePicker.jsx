import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

/**
  * composant React DatePicker customisé avec MUI
  * 
  * @param {object} props - les props du composant
  * @param {string} props.id - identifiant unique du champ
  * @param {string} props.name - nom du champ (utilisé dans les formulaires)
  * @param {string} props.value - valeur actuelle du champ, au format YYYY-MM-DD
  * @param {function} props.onChange - fonction appelée quand la date change (retourne une string YYYY-MM-DD)
  * @param {string} [props.minDate] - date minimale sélectionnable (format YYYY-MM-DD)
  * @param {string} [props.maxDate] - date maximale sélectionnable (format YYYY-MM-DD)
  * @param {boolean} [props.required] - indique si le champ est requis
  * 
  * @returns {JSX.Element} composant DatePicker prêt à être utilisé dans un formulaire
  */
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
                fontFamily: 'system-ui',
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
