import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addEmployee } from '../redux/employeesSlice'

import Modal from 'react-modal-component-uu0'

import CustomDatePicker from '../components/DatePicker'
import dayjs from 'dayjs'

import Dropdown from '../components/Dropdown'
import Input from '../components/Input'

import styled from 'styled-components'
import { colors } from '../styles/colors'
import { device } from '../styles/media'
import { montserratFont } from '../styles/font'

import statesData from '../assets/states.json'

import HRNetLogo from '../components/Logo'

//page principale
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

//container de la page
export const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 500px;

  @media ${device.laptop} {
    width: 500px;
    padding: 20px;
  }

  @media ${device.tablet} {
    width: 90%;
    padding: 15px;
  }

  @media ${device.mobileL} {
    width: 90%;
    padding: 10px;
  }

  @media ${device.mobileM} {
    width: 95%;
    padding: 8px;
  }

  @media ${device.mobileS} {
    width: 100%;
    padding: 6px;
  }
`

//header de la page
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media ${device.mobileM} {
    justify-content: left;
    flex-direction: column;
  }
`

//lien vers la liste des employés
export const ViewCurrentEmployee = styled.div`
  margin-top: 30px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 15px;
  @media ${device.tablet} {
    font-size: 13px;
    margin-top: 0px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 10px;
  }
`

//titre de la page
export const Title = styled.h1`
  font-size: 22px;
  @media ${device.tablet} {
    font-size: 22px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
`

//tabulation
export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: -30px;
  margin-right: -30px;
  flex-wrap: wrap;
  @media ${device.desktop} {
    margin-left: -30px;
    margin-right: -30px;
  }
  @media ${device.laptop} {
    margin-left: -20px;
    margin-right: -20px;
  }
  @media ${device.tablet} {
    margin-left: -15px;
    margin-right: -15px;
  }
  @media ${device.mobileL} {
    margin-left: -10px;
    margin-right: -10px;
  }
  @media ${device.mobileM} {
    margin-left: -8px;
    margin-right: -8px;
  }
  @media ${device.mobileS} {
    margin-left: -6px;
    margin-right: -6px;
  }
`

//élément tabulation
export const Tab = styled.button`
  margin-top: 10px;
  margin-bottom: 15px;
  flex: 1;
  padding: 10px;
  border: none;
  background: ${(props) => (props.$active ? colors.blue : '#f1f1f1')};
  color: ${(props) => (props.$active ? 'white' : 'black')};
  font-size: 12px;
  font-weight: bold;
  ${ montserratFont };
  font-weight: 600;
  cursor: pointer;
  @media ${device.mobileL} {
    font-size: 10px;
  }
`

export const Label = styled.label`
  font-size: 14px;
  display: block;
  font-weight: bold;
  color: black;
  margin-top: 10px;
  @media ${device.mobileL} {
    font-size: 12px;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`

export const Button = styled.button`
  width: 33%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: ${colors.blue};
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${colors.orange};
  }
  @media ${device.tablet} {
    width: 100%;
    padding: 10px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
  }
`

export default function CreateEmployee() {
  //variables d'état pour gérer la tabulation, la modale, et les données du formulaire
  const [activeTab, setActiveTab] = useState('information')
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [modalText, setModalText] = useState('')
  const [isInformationsFormSubmitted, setIsInformationsFormSubmitted] = useState(false) 
  const [isAddressFormSubmitted, setIsAddressFormSubmitted] = useState(false) 

  //redux et navigation hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

 //données du formulaire, initialisées avec des valeurs vides ou par défaut
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: new Date().toISOString().split('T')[0], 
    startDate: new Date().toISOString().split('T')[0], 
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  })

 //gère le changement des entrées du formulaire
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  //gère le changement de date pour les champs de sélection de date (birthDate et startDate)
  function handleDateChange(name, date) {
    setFormData({ ...formData, [name]: date || null })
  }

  //gère la sélection du département depuis le menu déroulant
  function handleDepartmentSelect(department) {
    setFormData({ ...formData, department })
  }

  //gère la sélection de l'état depuis le menu déroulant
  function handleStateSelect(state) {
    setFormData({ ...formData, state })
  }

  //gère la soumission du formulaire pour les onglets informations ou adresse
  function handleSubmit(e) {
    e.preventDefault()
  
    //valide et gère la soumission du formulaire en fonction de l'onglet actif
    if (activeTab === 'information') {
      setIsInformationsFormSubmitted(true)
  
      const isValid = formData.firstName.trim() !== '' &&
                      formData.lastName.trim() !== '' &&
                      formData.birthDate.trim() !== '' &&
                      formData.department.trim() !== ''

      //affiche une modale d'erreur et empêche la progression si un champ requis est manquant    
      if (!isValid) {
        setModalText('Please fill in all fields required in the Informations form')
        setIsModalOpen(true)
        return
      }

      //passer à l'onglet adresse
      setActiveTab('address') 
  
    } else {
      setIsAddressFormSubmitted(true)
  
      const isValid = formData.street.trim() !== '' &&
                      formData.city.trim() !== '' &&
                      formData.state.trim() !== '' &&
                      formData.zipCode.trim() !== ''

      //empêche la soumission si les champs du form adress sont manquants
      if (!isValid) {
        setModalText('Please fill in all fields required in the Address form')
        setIsModalOpen(true)
        return
      }
  
      //envoie de l'action pour add un employé au store
      dispatch(addEmployee(formData))
  
      //affiche  la modale de succès
      setModalText('Employee added successfully!')
      setIsModalOpen(true)
  
      //réinitialise les données du formulaire
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: new Date().toISOString().split('T')[0],
        startDate: new Date().toISOString().split('T')[0],
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '' 
      })

      //réinitialise les états de soumission du formulaire et retourne au form Information
      setIsInformationsFormSubmitted(false)
      setIsAddressFormSubmitted(false)
      setActiveTab('information')
    }
  }

  //change l'onglet à Information
  function handleBack() {
    setActiveTab('information')
  }

  return (
    <Page>
      <HRNetLogo />
      <Container>
        <Header>
          <Title>Create Employee</Title>
          <ViewCurrentEmployee onClick={() => navigate('/EmployeeList')}>
            View Current Employees
          </ViewCurrentEmployee>
        </Header>

        {/*boutons d'onglets pour basculer entre les formulaires d'information et d'adresse*/}
        <Tabs>
          <Tab $active={activeTab === 'information'}>INFORMATIONS</Tab>
          <Tab $active={activeTab === 'address'}>ADDRESS</Tab>
        </Tabs>

        {/*logique de soumission de formulaire*/}
        <form onSubmit={handleSubmit}>
          {activeTab === 'information' ? (
            <>
              {/*information form fields*/}
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                hasError={isInformationsFormSubmitted && !formData.firstName}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                hasError={isInformationsFormSubmitted && !formData.lastName}
              />
              <Label>Date of Birth</Label>
              <CustomDatePicker
                name='birthDate'
                value={formData.birthDate ? new Date(formData.birthDate) : null}
                onChange={(date) => handleDateChange('birthDate', date)}
                minDate={dayjs('1910-01-01')}
                maxDate={dayjs()}
                required
              />
              <Dropdown
                options={['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']}
                selected={formData.department}
                onSelect={handleDepartmentSelect}
                required
                formSubmitted={isInformationsFormSubmitted}
                label='Department'
              />
              <Label>Start Date</Label>
              <CustomDatePicker
                name='startDate'
                value={formData.startDate ? new Date(formData.startDate) : null}
                onChange={(date) => handleDateChange('startDate', date)}
                minDate={dayjs()}
                maxDate={dayjs(null)}
                required
              />
              <ButtonGroup>
                <Button type='submit'>Next</Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              {/*address form fields*/}
              <Input
                label="Street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                hasError={isAddressFormSubmitted && !formData.street}
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                hasError={isAddressFormSubmitted && !formData.city}
              />
              <Dropdown
                options={statesData.states}
                selected={formData.state}
                onSelect={handleStateSelect} 
                required
                formSubmitted={isAddressFormSubmitted}
                label="State"
              />
              <Input
                label="Zip Code"
                name="zipCode"
                type="number"
                value={formData.zipCode}
                onChange={handleChange}
                hasError={isAddressFormSubmitted && !formData.zipCode}
                min="0"
              />
              <ButtonGroup>
                <Button type='button' onClick={handleBack}>Back</Button>
                <Button type='submit'>Save</Button>
              </ButtonGroup>
            </>
          )}
        </form>
      </Container>

      {/*utilisation de la modale du package react-modal-component-uu0 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalText === 'Employee added successfully!' ? "Success" : "Error"}
        text={modalText}
        isError={modalText !== 'Employee added successfully!'}
        escapeClose={true}
        clickClose={true}
      />
    </Page>
  )
}
