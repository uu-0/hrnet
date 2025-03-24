import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/employeesSlice';
import Modal from '../components/Modal';
import styled from 'styled-components';
import { colors } from '../styles/colors';
import HRNetLogo from '../components/Logo';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 650px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ViewCurrentEmployee = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  margin-bottom: 15px;
  flex: 1;
  padding: 10px;
  border: none;
  background: ${(props) => (props.$active ? colors.orange : '#f1f1f1')};
  color: ${(props) => (props.$active ? 'white' : 'black')};
  font-weight: bold;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 17px;
  display: block;
  font-weight: bold;
  color: black;
`;

const Input = styled.input`
  width: 96%;
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 33%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  background: ${colors.orange};
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${colors.purple};
  }
`;

export default function CreateEmployee() {
  const [activeTab, setActiveTab] = useState('information');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'information') {
      setActiveTab('address');
    } else {
      dispatch(addEmployee(formData));
      setIsModalOpen(true);
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: ''
      });
    }
  };

  const handleBack = () => {
    setActiveTab('information');
  };

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
        <Tabs>
          <Tab $active={activeTab === 'information'}>INFORMATION</Tab>
          <Tab $active={activeTab === 'address'}>ADDRESS</Tab>
        </Tabs>
        <form onSubmit={handleSubmit}>
          {activeTab === 'information' ? (
            <>
              <Label>First Name</Label>
              <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <Label>Last Name</Label>
              <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              <Label>Date of Birth</Label>
              <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
              <Label>Start Date</Label>
              <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              <ButtonGroup>
                <Button type="submit">Next</Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <Label>Street</Label>
              <Input type="text" name="street" value={formData.street} onChange={handleChange} required />
              <Label>City</Label>
              <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
              <Label>State</Label>
              <Select name="state" value={formData.state} onChange={handleChange} required>
                <option value="">Select a state</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Label>Zip Code</Label>
              <Input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} min="0" required />
              <Label>Department</Label>
              <Select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select a department</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <ButtonGroup>
                <Button type="button" onClick={handleBack}>Back</Button>
                <Button type="submit">Save</Button>
              </ButtonGroup>
            </>
          )}
        </form>
      </Container>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Success">
        <p>Employee added successfully!</p>
      </Modal>
    </Page>
  );
}