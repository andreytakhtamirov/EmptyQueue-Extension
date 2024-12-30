import React, { useState } from "react";
import SettingsPopup from "../SettingsPopup/index";
import { FaGear } from "react-icons/fa6";
import "./index.css";

const SettingsButton = ({ optInStatus, onPositiveResponse, onNegativeResponse }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen((prev) => !prev);
    };

    return (
        <div>
            <FaGear
                onClick={togglePopup}
                className="settings-button"
            />

            {isPopupOpen &&
                <SettingsPopup
                    optInStatus={optInStatus}
                    onClose={togglePopup}
                    onPositiveResponse={onPositiveResponse}
                    onNegativeResponse={onNegativeResponse}
                />
            }
        </div>
    );
};

export default SettingsButton;
