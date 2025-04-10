import React from 'react'
import styled, { css } from 'styled-components'

//tableau
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
//bloc qui contient l'header
const HeaderBloc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

//header du tableau
const TableHeader = styled.th`
  width: 10%;
  cursor: pointer;
  padding: 0px 5px 8px 5px;
  text-align: left;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;border-bottom: 2px solid #ddd;
  user-select: none;
`

//triangle
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
      color: blue;
      transform: rotate(${$direction === 'asc' ? '0deg' : '180deg'});
    `}
`

//cellules
const TableCell = styled.td`
  text-align: left;
  height: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
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
      {employees.length === 0 ? (
    <tr>
      <TableCell colSpan="9">
        No data in the table
      </TableCell>
    </tr>
  ) : (
    employees.map((employee, index) => (
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
        ))
      )}
      </tbody>
    </Table>
  )
}
