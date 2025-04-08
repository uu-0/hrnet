import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addEmployee } from '../redux/employeesSlice'

import Modal from 'react-modal-component-uu0'

import CustomDatePicker from '../components/DatePicker'
import dayjs from 'dayjs'

import Dropdown from '../components/Dropdown'

import styled from 'styled-components'
import { colors } from '../styles/colors'

import { montserratFont } from '../styles/font'
import statesData from '../assets/states.json'

import HRNetLogo from '../components/Logo'

//styles pour la mise en page
const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 650px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const ViewCurrentEmployee = styled.div`
  margin-top: 30px;
  text-decoration: underline;
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 28px;
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-left: -30px;
  margin-right: -30px;
`

const Tab = styled.button`
  margin-top: 10px;
  margin-bottom: 15px;
  flex: 1;
  padding: 10px;
  border: none;
  background: ${(props) => (props.$active ? colors.blue : '#f1f1f1')};
  color: ${(props) => (props.$active ? 'white' : 'black')};
  font-weight: bold;
  ${ montserratFont };
  font-weight: 600;
`

const Label = styled.label`
  font-size: 17px;
  display: block;
  font-weight: bold;
  color: black;
`

const Input = styled.input`
  width: 96%;
  padding: 16.5px 14px;
  margin: 10px 0 20px 0;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ddd')};
  border-radius: 5px;
  font-size: 18px;
  color: black;
  ${montserratFont};
  
  &::placeholder {
    color: ${({ $hasError }) => ($hasError ? 'red' : '#aaa')};
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : colors.blue)};
    outline: none;
  }
  
  &:hover {
    border-color: ${({ $hasError }) => ($hasError ? 'red' : 'black')};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  width: 33%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: ${colors.blue};
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${colors.orange};
  }
`

export default function CreateEmployee() {
  //variables d'état pour gérer les données du formulaire et les états de l'interface utilisateur
  const [activeTab, setActiveTab] = useState('information')
  const [isModalOpen, setIsModalOpen] = useState(false) 
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

  //gèrer la sélection du département depuis le menu déroulant
  function handleDepartmentSelect(department) {
    setFormData({ ...formData, department })
  }

  //gère la sélection de l'état depuis le menu déroulant
  function handleStateSelect(state) {
    setFormData({ ...formData, state })
  }

  //gère la soumission du formulaire pour les onglets informations ou adresse
  function handleSubmit(e) {
    e.preventDefault();
  
    //valider et gérer la soumission du formulaire en fonction de l'onglet actif
    if (activeTab === 'information') {
      setIsInformationsFormSubmitted(true)

      const isValid = formData.firstName.trim() !== '' &&
                      formData.lastName.trim() !== '' &&
                      formData.birthDate.trim() !== '' &&
                      formData.department.trim() !== ''
      //empêche la progression si un champ requis est manquant        
      if (!isValid) return

      //passer à l'onglet adresse
      setActiveTab('address') 

    } else {
      setIsAddressFormSubmitted(true)

      const isValid = formData.street.trim() !== '' &&
                      formData.city.trim() !== '' &&
                      formData.state.trim() !== '' &&
                      formData.zipCode.trim() !== ''

      if (!isValid) return // Prevent submission if address fields are missing

      // Dispatch the action to add employee to the redux store
      dispatch(addEmployee(formData))

      // Open success modal and reset form data
      setIsModalOpen(true)
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

      // Reset form submission states and switch back to the information tab
      setIsInformationsFormSubmitted(false)
      setIsAddressFormSubmitted(false)
      setActiveTab('information')
    }
  }

  // Handle the back button to switch tabs
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

        {/* Tab buttons for switching between information and address forms */}
        <Tabs>
          <Tab $active={activeTab === 'information'}>INFORMATIONS</Tab>
          <Tab $active={activeTab === 'address'}>ADDRESS</Tab>
        </Tabs>

        {/* Form submission logic */}
        <form onSubmit={handleSubmit}>
          {activeTab === 'information' ? (
            <>
              {/*information form fields*/}
              <Label>First Name</Label>
              <Input 
                type='text' 
                name='firstName' 
                value={formData.firstName} 
                onChange={handleChange} 
                $hasError={isInformationsFormSubmitted && !formData.firstName} 
                placeholder={isInformationsFormSubmitted && !formData.firstName ? 'This field is required' : null} 
              />
              <Label>Last Name</Label>
              <Input 
                type='text' 
                name='lastName' 
                value={formData.lastName} 
                onChange={handleChange} 
                $hasError={isInformationsFormSubmitted && !formData.lastName} 
                placeholder={isInformationsFormSubmitted && !formData.lastName ? 'This field is required' : null} />
              <Label>Date of Birth</Label>
              <CustomDatePicker
                name='birthDate'
                value={formData.birthDate ? new Date(formData.birthDate) : null}
                onChange={(date) => handleDateChange('birthDate', date)}
                minDate={dayjs('1910-01-01')}
                maxDate={dayjs()}
                required
              />
              <Label>Department</Label>
              <Dropdown
                options={['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal']}
                selected={formData.department}
                onSelect={handleDepartmentSelect} // Appel de la fonction handleDepartmentSelect
                required
                formSubmitted={isInformationsFormSubmitted}
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
              <Label>Street</Label>
              <Input 
                type='text' 
                name='street' 
                value={formData.street} 
                onChange={handleChange} 
                $hasError={isAddressFormSubmitted && !formData.street} 
                placeholder={isAddressFormSubmitted && !formData.street ? 'This field is required' : null}
                 />
              <Label>City</Label>
              <Input 
                type='text' 
                name='city' 
                value={formData.city} 
                onChange={handleChange} 
                $hasError={isAddressFormSubmitted && !formData.city} 
                placeholder={isAddressFormSubmitted && !formData.city ? 'This field is required' : null}
                />
              <Label>State</Label>
              <Dropdown
                options={statesData.states}
                selected={formData.state}
                onSelect={handleStateSelect} 
                required
                formSubmitted={isAddressFormSubmitted}
              />
              <Label>Zip Code</Label>
              <Input 
                type='number' 
                name='zipCode' 
                value={formData.zipCode} 
                onChange={handleChange} 
                min='0' 
                $hasError={isAddressFormSubmitted && !formData.zipCode} 
                placeholder={isAddressFormSubmitted && !formData.zipCode ? 'This field is required' : null} 
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
        title="Success"
        text="Employee added successfully!"
        escapeClose={true}
        clickClose={true}
      />
    </Page>
  )
}
