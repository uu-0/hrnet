import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import EmployeeTable from '../components/EmployeeTable'

import styled, { css } from 'styled-components'
import { device } from '../styles/media'
import { systemUiFont } from '../styles/font'

import HRNetLogo from '../components/Logo'


/**
 * composant principal affichant la liste des employés
 * 
 * - récupère les données des employés depuis le store Redux.
 * - permet la recherche par prénom ou nom.
 * - gère le tri dynamique des colonnes.
 * - implémente la pagination et le choix du nombre d'éléments par page.
 * - permet la navigation vers la page d'accueil.
 * 
 * @component
 * @returns {JSX.Element} le composant `EmployeeList`
 */
export default function EmployeeList() {
  //récupération des employés depuis le store redux
  const employees = useSelector((state) => state.employees)
  const navigate = useNavigate()

  //états pour la gestion du tri, des items par page, de la pagination, de la recherche, et du select
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' })
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
            <SelectWrapper>
            <label htmlFor="itemsPerPage" className="visually-hidden">
              Number of items per page
            </label>
            <Select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
                setIsDropdownOpen(false)
                e.target.blur()
              }}
              onFocus={() => setIsDropdownOpen(true)} 
              onBlur={() => setIsDropdownOpen(false)} 
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
              <Triangle $active={isDropdownOpen}>▼</Triangle>
            </SelectWrapper>


            {/* champ de recherche */}
            <label htmlFor="searchInput" className="visually-hidden">
              Search by first or last name
            </label>
            <SearchInput
              id="searchInput"
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
        <EmployeeNumber aria-live="polite">
          Showing {paginatedEmployees.length} of {sortedEmployees.length} employee{sortedEmployees.length > 1 ? 's' : ''} in {totalPages} page{totalPages > 1 ? 's' : ''}
        </EmployeeNumber>

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
            aria-label="Go to previous page"
          >
            Back
          </Button>
          <span> Page {currentPage} of {totalPages} </span>
          <Button 
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </Pagination>
      </Container>
    </Page>
  )
}

//---------- styles ----------

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
  width: 1300px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${device.desktop} {
    width: 960px;
  }
  @media ${device.laptop} {
    width: 650px;
  }

  @media ${device.tablet} {
    width: 500px;
    padding: 20px;
  }

  @media ${device.mobileL} {
    width: 350px;
    padding: 15px;
  }

   @media ${device.mobileM} {
    width: 280px;
    padding: 15px;
  }
  
  @media ${device.mobileS} {
    width: 150px;
    padding: 15px;
  }
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
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.tablet} {
    font-size: 14px;
  }
`
//btn back
const Back = styled.div`
  margin-top: 30px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  @media ${device.tablet} {
    margin-top: 15px;
    font-size: 12px;
  }
  @media ${device.mobileS} {
    margin-top: 13px;
    font-size: 10px;
  }
`
//select et search bloc
const Bloc = styled.div`
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  @media ${device.mobileS} {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 10px;
  }
`
//wrapper du select pour inclure le triangle custom
const SelectWrapper = styled.div`
  position: relative;
  width: 60px;
`
//select 
const Select = styled.select`
  border: 1px solid lightGray;
  border-radius: 8px;
  padding: 16.5px 10px 16.5px 10px;
  font-size: 13px;
  ${systemUiFont};
  appearance: none;
  background-color: white;
  width: 100%;
  &:hover{
    border-color: #007bff;
    cursor: pointer;
  }
  @media ${device.tablet} {
    font-size: 10px;
  }
  @media ${device.mobileS} {
    padding: 10px 10px;
    font-size: 8px;
  }
`
//triangle custom
const Triangle = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  font-size: 12px;
  color: #999;
  pointer-events: none;
  transition: transform 0.2s ease, color 0.2s ease;
  ${({ $active }) =>
    $active &&
    css`
      color: blue;
      transform: translateY(-50%) rotate(180deg);
    `}
  @media ${device.tablet} {
    top: 49%;
    font-size: 8px;
  }
  @media ${device.mobileS} {
    right: 8px;
    font-size: 6px;
  }
`

//search
const SearchInput = styled.input`
  width: 100%;
  padding: 16.5px 14px;
  border: 1px solid lightGray;
  border-radius: 8px;
  ${ systemUiFont };
  font-size: 13px;
  &:hover{
    border-color: #007bff;
  } 
    @media ${device.tablet} {
    font-size: 10px;
  }
    @media ${device.mobileS} {
    padding: 10px 10px;
    font-size: 6px;
  }
`

//nombre d'employés affichés
const EmployeeNumber = styled.p`
  font-size: 13px;
  @media ${device.mobileS} {
    font-size: 8px;
  }
`

//pagination
const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  font-size: 13px;
  @media ${device.mobileS} {
    margin-top: 0;
    font-size: 8px;
  }
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
  @media ${device.mobileS} {
    padding: 6px;
    font-size: 8px;
  }
`