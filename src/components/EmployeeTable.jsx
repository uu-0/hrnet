import React from 'react'
import styled, { css } from 'styled-components'

// tableau
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

// header du tableau
const TableHeader = styled.th`
  cursor: pointer;
  padding: 10px 0px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  user-select: none;
`

// composant Triangle (ici, on utilise $active et $direction)
const Triangle = styled.span`
  margin-left: 5px;
  display: inline-block;
  font-size: 20px;
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

// cellules
const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`

export default function EmployeeTable({ employees, handleSort, sortConfig }) {
  const renderHeader = (label, key) => {
    const isActive = sortConfig.key === key

    return (
      <TableHeader onClick={() => handleSort(key)}>
        {label}
        <Triangle $active={isActive} $direction={sortConfig.direction}>⏷</Triangle>
      </TableHeader>
    )
  }

  return (
    <Table>
      <thead>
        <tr>
          {renderHeader('First Name', 'firstName')}
          {renderHeader('Last Name', 'lastName')}
          {renderHeader('Start Date', 'startDate')}
          {renderHeader('Department', 'department')}
          {renderHeader('Date of Birth', 'birthDate')}
          {renderHeader('Street', 'street')}
          {renderHeader('City', 'city')}
          {renderHeader('State', 'state')}
          {renderHeader('Zip Code', 'zipCode')}
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <TableCell>{employee.firstName}</TableCell>
            <TableCell>{employee.lastName}</TableCell>
            <TableCell>{employee.startDate}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.birthDate}</TableCell>
            <TableCell>{employee.street}</TableCell>
            <TableCell>{employee.city}</TableCell>
            <TableCell>{employee.state}</TableCell>
            <TableCell>{employee.zipCode}</TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
