import React from 'react'

import styled, { css } from 'styled-components'
import { device } from '../styles/media'


/**
 * composant `EmployeeTable` : affiche un tableau de données des employés avec tri interactif.
 *
 * - affiche les employés dans un tableau responsive (desktop et mobile).
 * - permet de trier les colonnes en cliquant sur les en-têtes.
 * - gère un état de tri externe (clé + direction) via `sortConfig`.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.employees - liste des employés à afficher.
 * @param {function} props.handleSort - fonction appelée lorsqu’un en-tête est cliqué pour trier.
 * @param {Object} props.sortConfig - objet contenant la clé de tri et la direction (asc/desc).
 * @returns {JSX.Element} le tableau des employés.
 */
export default function EmployeeTable({ employees, handleSort, sortConfig }) {

  /**
   * génère une cellule d'en-tête avec un label et une icône de tri.
   * @param {string} label - le texte visible de l'en-tête.
   * @param {string} key - la clé associée au champ à trier.
   * @returns {JSX.Element}
   */
  function renderHeader(label, key) {
    const isActive = sortConfig.key === key

    return (
      <TableHeader 
        onClick={() => handleSort(key)} 
        onKeyDown={(e) => e.key === 'Enter' && handleSort(key)} 
        tabIndex={0}
        role="button"
        aria-label={`Sort by ${label}`}
      >
        <HeaderBloc>
          <span>{label}</span>
          {/* icône triangle qui change selon l'état de tri */}
          <Triangle $active={isActive} $direction={sortConfig.direction}>⏷</Triangle>
        </HeaderBloc>
      </TableHeader>
    )
  }

  return (
    <>
      {/* tableau version desktop */}
      <Table>
        <thead>
          <TitleHeader>
            {/* en-têtes cliquables avec tri */}
            {renderHeader('First Name', 'firstName')}
            {renderHeader('Last Name', 'lastName')}
            {renderHeader('Start Date', 'startDate')}
            {renderHeader('Department', 'department')}
            {renderHeader('Date of Birth', 'birthDate')}
            {renderHeader('Street', 'street')}
            {renderHeader('City', 'city')}
            {renderHeader('State', 'state')}
            {renderHeader('Zip Code', 'zipCode')}
          </TitleHeader>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            //affichage si pas de données
            <TableRow>
              <TableCell colSpan="9">No data in the table</TableCell>
            </TableRow>
          ) : (
            //affichage des lignes employé par employé
            employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell $odd={index % 2 === 0}>{employee.firstName}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.lastName}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.startDate}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.department}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.birthDate}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.street}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.city}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.state}</TableCell>
                <TableCell $odd={index % 2 === 0}>{employee.zipCode}</TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>

      {/* version mobile en carte verticales */}
      <MobileWrapper>
        {employees.length === 0 ? (
          <MobileCard>No data in the table</MobileCard>
        ) : (
          employees.map((employee, index) => (
            <MobileCard key={index}>
              <MobileRow>
                <MobileLabel>First Name:</MobileLabel>
                <span>{employee.firstName}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Last Name:</MobileLabel>
                <span>{employee.lastName}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Start Date:</MobileLabel>
                <span>{employee.startDate}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Department:</MobileLabel>
                <span>{employee.department}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Date of Birth:</MobileLabel>
                <span>{employee.birthDate}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Street:</MobileLabel>
                <span>{employee.street}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>City:</MobileLabel>
                <span>{employee.city}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>State:</MobileLabel>
                <span>{employee.state}</span>
              </MobileRow>
              <MobileRow>
                <MobileLabel>Zip Code:</MobileLabel>
                <span>{employee.zipCode}</span>
              </MobileRow>
            </MobileCard>
          ))
        )}
      </MobileWrapper>
    </>
  )
}


//---------- styles ----------

//tableau
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  @media ${device.tablet} {
    width: 100%;
  }
  @media ${device.mobileL} {
    display: none;
  }
`

//conteneur de l'en-tête
const HeaderBloc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

//en-têtes de colonnes
const TableHeader = styled.th`
  width: 11%;
  cursor: pointer;
  padding: 12px 15px;
  text-align: left;
  background-color: #f4f6f8;
  border-bottom: 2px solid #ddd;
  user-select: none;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #eaeef1;
  }
   @media ${device.laptop} {
    padding: 10px 0px;
  }
`
//titre de l'header
const TitleHeader = styled.tr`
  font-size: 13px;
  color: #333;
   @media ${device.desktop} {
    font-size: 12px;
  }
   @media ${device.laptop} {
    font-size: 10px;
  }
  @media ${device.tablet} {
    font-size: 6px;
  }
  @media ${device.mobileL} {
    font-size: 6px;
  }
`

//triangle de tri
const Triangle = styled.span`
  font-size: 14px;
  color: #999;
  transform: rotate(0deg);
  transition: transform 0.2s ease, color 0.2s ease;

  ${({ $active, $direction }) =>
    $active &&
    css`
      color: blue;
      transform: rotate(${$direction === 'asc' ? '0deg' : '180deg'});
    `}
  @media ${device.tablet} {
    font-size: 10px;
  }
`
//lignes du tableau
const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  &:hover td {
    background-color: #f1f5f9;
  }
`

//cellules
const TableCell = styled.td`
  font-size: 12px;
  text-align: center;
  padding: 12px 15px;
  background-color: ${({ $odd }) => ($odd ? '#fff' : '#f9fafb')};
  color: #444;
  border-bottom: 1px solid #eee;
  @media ${device.tablet} {
    font-size: 8px;
    padding: 8px;
  }
`

//container carte version mobile
const MobileWrapper = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`
//carte version mobile
const MobileCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  @media ${device.mobileS} {
    padding: 5px;
  }
`
//ligne version mobile
const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 12px;
  color: #444;
  @media ${device.mobileS} {
    font-size: 10px;
  }
`
//label version mobile
const MobileLabel = styled.span`
  font-weight: bold;
  color: #333;
`