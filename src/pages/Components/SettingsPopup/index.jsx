import React, { useEffect, useRef } from 'react';
import SupportPrompt from "../SupportPrompt";
import './index.css';

const SettingsPopup = ({ optInStatus, onClose, onPositiveResponse, onNegativeResponse }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    function handlePositiveResponse() {
        onClose();
        onPositiveResponse();
    }

    function handleNegativeResponse() {
        onClose();
        onNegativeResponse();
    }

    return (
        <div className="settings-popup-overlay">
            <div
                ref={popupRef}
                className="settings-popup-content"
            >
                <div className="settings-popup-inner">
                    <h2 className="settings-popup-title">Settings</h2>
                    <SupportPrompt
                        optInStatus={optInStatus}
                        hasSelectedOption={true}
                        onPositiveResponse={handlePositiveResponse}
                        onNegativeResponse={handleNegativeResponse}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;
