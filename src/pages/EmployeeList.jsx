import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import EmployeeTable from '../components/EmployeeTable'

import styled from 'styled-components'
import { montserratFont } from '../styles/font'

import HRNetLogo from '../components/Logo'

//page principale
const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`
//container de la page
const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 1500px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

//header de la page avec le titre et le btn back
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
//titre
const Title = styled.h1`
  color: black;
  font-size: 22px;
`
//btn back
const Back = styled.div`
  margin-top: 30px;
  text-decoration: underline;
  cursor: pointer;
`
//select et search bloc
const Bloc = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  `
//select 
const Select = styled.select`
  border: 1px solid lightGray;
  border-radius: 8px;
  padding: 16.5px 14px;
  font-size: 16px;
`
//search
const SearchInput = styled.input`
  width: 100%;
  padding: 16.5px 14px;
  border: 1px solid lightGray;
  border-radius: 8px;
  ${ montserratFont };
  font-size: 16px;
  &:hover{
    border-color: #007bff;
  }
`
//pagination
const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`
//boutons pagination (back et next)
const Button = styled.button`
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:disabled{
    background-color: #ccc;
    cursor: not-allowed;
  }
`

export default function EmployeeList() {
  //récupération des employés depuis le store redux
  const employees = useSelector((state) => state.employees)
  const navigate = useNavigate()

  //états pour la gestion du tri, des items par page, de la pagination et de la recherche
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  /**
   * gère le tri des employés en fonction d'une clé spécifique
   * @param {string} key clé sur laquelle effectuer le tri
   */
  function handleSort(key) {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  //filtre les employés sur le prénom et le nom
  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  //tri les employés selon la configuration de tri
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (sortConfig.direction === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    }
  })

  //calcul du nombre total de pages
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage)

  //découpage des employés selon la pagination
  const paginatedEmployees = sortedEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <Page>
      <HRNetLogo />
      <Container>
        <Header>
          <Title>Employee List</Title>
          <Back onClick={() => navigate('/')}>Back</Back>
        </Header>
        <Bloc>
            {/* sélection du nombre d'éléments affichés par page */}
            <Select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>

            {/* champ de recherche */}
            <SearchInput
              type="text"
              placeholder="Search by first or last name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
        </Bloc>
        
        {/* affichage du nombre d'employés affichés */}
        <p>Showing {paginatedEmployees.length} of {sortedEmployees.length} employees in {totalPages} pages</p>

        {/* tableau employés */}
        <EmployeeTable
          employees={paginatedEmployees}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />

        {/* pagination */}
        <Pagination>
          <Button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Back
          </Button>
          <span> Page {currentPage} of {totalPages} </span>
          <Button 
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </Pagination>
      </Container>
    </Page>
  )
}
