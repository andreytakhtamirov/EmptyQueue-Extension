import React, { useEffect, useState } from "react";
import "./index.css"

const SupportPrompt = ({ optInStatus, hasSelectedOption = false, onPositiveResponse, onNegativeResponse }) => {

    function getMessage() {
        if (!hasSelectedOption) {
            return <p>Would you like to share unused bandwidth to support this extension?</p>;
        } else if (optInStatus) {
            return <p>Thank you! You've chosen to share unused internet bandwidth through Mellowtel to support this extension.</p>;
        } else {
            return <p>You've decided not to share unused internet bandwidth through Mellowtel to support this extension.</p>;
        }
    }

    function getPositiveButtonLabel() {
        if (!hasSelectedOption) {
            return "Yes, share unused bandwidth";
        } else if (optInStatus) {
            return "Continue sharing";
        } else {
            return "Start sharing";
        }
    }

    function getNegativeButtonLabel() {
        if (!hasSelectedOption) {
            return "No, don't share bandwidth";
        } else if (optInStatus) {
            return "Stop sharing";
        } else {
            return "Continue not sharing";
        }
    }

    return (
        <div className={`${!hasSelectedOption ? "bandwidth-sharing-prompt-card" : "bandwidth-sharing-prompt-inline"}`}>
            <p>
                {getMessage()}
                <br />
                It's completely anonymous and doesn't involve any personal data. For more details, <b><a target="_blank" rel="noopener noreferrer" href="https://www.mellow.tel/user-control/#manage-settings">visit Mellowtel's page</a>.</b>
            </p>
            <div className="button-group">
                <button
                    className={`button-positive btn ${!hasSelectedOption ? "active" : optInStatus ? "active" : "inactive"}`}
                    onClick={() => onPositiveResponse()}
                >
                    {getPositiveButtonLabel()}
                </button>
                <button
                    className={`button-negative btn ${!hasSelectedOption ? "active-red" : !optInStatus ? "active" : "inactive"}`}
                    onClick={() => onNegativeResponse()}
                >
                    {getNegativeButtonLabel()}
                </button>
            </div>

        </div>
    );
};

export default SupportPrompt;