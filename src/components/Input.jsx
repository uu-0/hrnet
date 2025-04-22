import React from 'react'

import styled from 'styled-components'

import { systemUiFont } from '../styles/font'
import { colors } from '../styles/colors'
import { device } from '../styles/media'

/**
 * composant `Input` : champ de saisie générique avec validation d'erreur et message d'erreur.
 * 
 * ce composant permet de créer un champ de saisie flexible qui peut être personnalisé avec 
 * différents types de champs (texte, email, etc.), prendre en charge un message d'erreur 
 * et afficher un label pour l'accessibilité.
 *
 * @component
 * @param {string} label - le texte du label associé au champ de saisie.
 * @param {string} type - le type du champ d'entrée (par défaut, 'text').
 * @param {string} name - le nom du champ d'entrée.
 * @param {string} value - la valeur actuelle du champ d'entrée.
 * @param {function} onChange - fonction qui gère les changements de valeur du champ d'entrée.
 * @param {boolean} hasError - indicateur d'erreur pour afficher un message d'erreur.
 * @param {string} placeholder - texte de substitution à afficher lorsque le champ est vide.
 * @param {number} min - valeur minimale pour un champ numérique.
 * @returns {JSX.Element} le champ de saisie.
 */
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
        placeholder={hasError ? placeholder || 'This field is required' : ' '} // espace pour éviter changement de hauteur
        min={min}
      />
    </>
  )
}

//label de l'input
const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: 600;
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
  color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  min-height: 20px;
  ${systemUiFont};
  &::placeholder {
    color: ${({ $hasError }) => ($hasError ? 'red' : '#aaa')};
    opacity: 1;
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