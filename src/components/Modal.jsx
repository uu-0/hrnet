import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { colors } from '../styles/colors'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled.h2`
  font-size: 24px;
  color: black;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.orange};
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${colors.purple};
  }
`

const ModalBody = styled.div`
  padding: 20px 0;
  font-size: 16px;
  color: black;
`

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </Overlay>,
    document.getElementById('portal') // Assurez-vous que cet élément existe dans votre HTML
  )
}
