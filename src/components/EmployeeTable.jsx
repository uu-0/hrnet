import React from 'react'

import styled, { css } from 'styled-components'
import { device } from '../styles/media'

//tableau
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
`

//conteneur de l'en-tête
const HeaderBloc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  @media ${device.mobileL} {
    gap: 3px;
  }
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
    @media ${device.tablet} {
    width: 5%;
    font-size: 8px;
    padding: 8px;
  }
`

const TitleHeader = styled.tr`
  font-size: 13px;
  color: #333;
   @media ${device.mobileL} {
    font-size: 11px;
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
`
//lignes du tableau
const TableRow = styled.tr`
  transition: background-color 0.2s ease;
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

export default function EmployeeTable({ employees, handleSort, sortConfig }) {
  function renderHeader(label, key) {
    const isActive = sortConfig.key === key

    return (
      <TableHeader onClick={() => handleSort(key)}>
        <HeaderBloc>
          <span>{label}</span>
          <Triangle $active={isActive} $direction={sortConfig.direction}>⏷</Triangle>
        </HeaderBloc>
      </TableHeader>
    )
  }

  return (
    <Table>
      <thead>
        <TitleHeader>
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
          <TableRow>
            <TableCell colSpan="9">No data in the table</TableCell>
          </TableRow>
        ) : (
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
  )
}
