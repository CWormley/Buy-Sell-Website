/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: deletemodal.js
*
* Description:: 
* This React component renders a confirmation modal with a message and "Yes"/"No" buttons. 
* It displays only when isOpen is true and triggers onConfirm or onClose callbacks based on user action. 
* Styles are applied via style.css.
* 
**************************************************************/
import React from 'react';
import './style.css';
const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="confirm-button">Yes</button>
                    <button onClick={onClose} className="cancel-button">No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;