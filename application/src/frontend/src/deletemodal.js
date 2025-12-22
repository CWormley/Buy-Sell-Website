/**
 * @file deletemodal.js
 * @description Reusable confirmation modal component for user actions.
 * Displays yes/no confirmation dialog for destructive operations.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React from 'react';
import './style.css';

/**
 * Modal component - Confirmation dialog
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Callback when user selects No
 * @param {Function} props.onConfirm - Callback when user selects Yes
 * @param {string} props.message - Confirmation message to display
 * @returns {React.ReactElement|null} Modal overlay or null if not open
 */
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