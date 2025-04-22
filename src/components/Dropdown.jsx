import React, { useState } from 'react'

import styled, { css } from 'styled-components'
import { colors } from '../styles/colors'
import { device } from '../styles/media'


/**
 * composant personnalisé de menu déroulant (dropdown).
 * 
 * - permet la sélection d'une option parmi une liste donnée.
 * - affiche un message d'erreur si le champ est requis et non sélectionné après soumission du formulaire.
 * - gère l'ouverture/fermeture du menu avec animation.
 * - style responsive avec `styled-components`.
 * 
 * @component
 * @param {Object} props
 * @param {string[]} props.options - liste des options à afficher dans le dropdown.
 * @param {string} props.selected - valeur actuellement sélectionnée.
 * @param {function} props.onSelect - callback déclenchée lorsqu’une option est sélectionnée.
 * @param {boolean} [props.required=false] - indique si le champ est requis.
 * @param {boolean} [props.formSubmitted=false] - indique si le formulaire a été soumis (utilisé pour afficher les erreurs).
 * @param {string} props.label - label du champ dropdown.
 * @returns {JSX.Element} le composant `Dropdown`
 */
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
      <Label>{label}</Label>
      <DropdownContainer>
        <DropdownButton $isOpen={isOpen} $hasError={hasError} onClick={handleToggle}>
        <DropdownText $hasError={hasError}>
          {hasError ? 'This field is required' : selected || " "}
        </DropdownText>
          <Triangle $active={isOpen} $direction={isOpen ? 'asc' : 'desc'}>⏷</Triangle>
        </DropdownButton>
        <DropdownList $isOpen={isOpen}>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      </DropdownContainer>
    </>
  )
}

//---------- styles ----------

//label du dropdown
const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: 600;
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
  min-height: 20px;
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
  min-height: 20px; 
  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  }
`
//span pour l'erreur
const DropdownText = styled.span`
  display: inline-block;
  min-height: 18px;
  font-size: 13px;
  color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
`

//liste du dropdown
const DropdownList = styled.ul`
  position: absolute;
  top: 90%;
  right: 0;
  width: 60%;
  max-height: ${({ $isOpen }) => ($isOpen ? '200px' : '0px')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-5px)')};
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