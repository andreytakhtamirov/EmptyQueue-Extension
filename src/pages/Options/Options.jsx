import React, { useState, useEffect } from "react";
import Mellowtel from "mellowtel";
import './Options.css';
import SupportPrompt from "../Components/SupportPrompt";
import { CONFIGURATION_KEY } from "../../constants";

const Options = () => {
  const [optInStatus, setOptInStatus] = useState(null);
  const mellowtel = new Mellowtel(CONFIGURATION_KEY);

  function startMellowtel() {
    mellowtel.start();
  }

  useEffect(() => {
    chrome.storage.local.get('mellowtelEnabled', (result) => {
      setOptInStatus(result.mellowtelEnabled);
    });
  }, []);

  const saveSupportChoice = (value) => {
    chrome.storage.local.set({ mellowtelEnabled: value });
  };

  const handlePositiveResponse = async () => {
    saveSupportChoice(true);
    setOptInStatus(true);
    await mellowtel.optIn();
    startMellowtel();
  };

  const handleNegativeResponse = () => {
    saveSupportChoice(false);
    setOptInStatus(false);
    mellowtel.optOut();
  };

  return (
    <div className="settings-popup-inner">
      <h2 className="settings-popup-title">Settings</h2>
      <SupportPrompt
        optInStatus={optInStatus}
        hasSelectedOption={true}
        onPositiveResponse={handlePositiveResponse}
        onNegativeResponse={handleNegativeResponse}
      />
    </div>
  );
};


export default Options;
