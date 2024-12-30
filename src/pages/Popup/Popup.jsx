import React, { useState, useEffect } from "react";
import Mellowtel from "mellowtel";
import "./Popup.css";
import ProjectItem from "../Components/ProjectItem/index"
import SupportPrompt from "../Components/SupportPrompt";
import SettingsButton from "../Components/SettingsButton/index";
import { CONFIGURATION_KEY } from "../../constants";

const Popup = () => {
  const [data, setData] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState("Unknown");
  const [optInStatus, setOptInStatus] = useState(null);
  const mellowtel = new Mellowtel(CONFIGURATION_KEY);

  function startMellowtel() {
    mellowtel.start();
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await chrome.storage.local.get(["interceptedData", "lastSyncTime"]);
      if (result.interceptedData) {
        setData(result.interceptedData);
        setLastSyncTime(result.lastSyncTime || "Unknown");
      } else {
        setData(null);
      }
    };

    chrome.storage.local.get('mellowtelEnabled', (result) => {
      setOptInStatus(result.mellowtelEnabled);
    });

    fetchData();
  }, []);

  const getReviewLevelText = (level) => {
    const levelMap = {
      "-1": "-1 (Attempter)",
      "0": "0 (Reviewer)",
      "1": "1 (Reviewer)",
      "10": "10 (Senior Reviewer)",
    };

    return levelMap[level] || "Unknown";
  };

  const renderEmptyQueueReasons = (emptyQueueReasons = {}, primaryMap = {}, secondaryMap = {}) => {
    const reasons = Object.entries(emptyQueueReasons).map(([projectId, reasons]) => {
      let tag = null;
      if (primaryMap[projectId] != null) {
        tag = "primary";
      } else if (secondaryMap[projectId] != null) {
        tag = "secondary";
      }

      const reviewLevelText = primaryMap[projectId]
        ? getReviewLevelText(primaryMap[projectId])
        : secondaryMap[projectId]
          ? getReviewLevelText(secondaryMap[projectId])
          : "Unknown";

      return (
        <ProjectItem
          key={`reason-${projectId}`}
          projectId={projectId}
          reasons={reasons}
          reviewLevelText={reviewLevelText}
          tag={tag}
        />
      );
    });

    return reasons.length > 0 ? reasons : <p className="text-empty-view">No projects found</p>;
  };

  const renderContent = () => {
    if (!data) return <p className="text-empty-view">No data received yet</p>;
    const { lastEmptyQueueEvent } = data;
    if (!lastEmptyQueueEvent) return <p className="text-empty-view">No project data found</p>;

    const {
      currentPrimaryTeamAssignments = [],
      currentSecondaryTeamAssignments = [],
      emptyQueueReasons = {},
    } = lastEmptyQueueEvent;

    const primaryMap = Object.fromEntries(
      currentPrimaryTeamAssignments.map(({ projectId, reviewLevel }) => [projectId, String(reviewLevel)])
    );
    const secondaryMap = Object.fromEntries(
      currentSecondaryTeamAssignments.map(({ projectId, reviewLevel }) => [projectId, String(reviewLevel)])
    );

    return (
      <>
        <h2>Projects</h2>
        {renderEmptyQueueReasons(emptyQueueReasons, primaryMap, secondaryMap)}
      </>
    );
  };

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
    <div className="App">
      <header className="App-header">
        <h1>EmptyQueue</h1>
      </header>
      {optInStatus != null &&
        <div className="settings-button">
          <SettingsButton optInStatus={optInStatus} onPositiveResponse={handlePositiveResponse} onNegativeResponse={handleNegativeResponse} />
        </div>
      }
      {optInStatus == null &&
        <SupportPrompt
          optInStatus={optInStatus}
          onPositiveResponse={handlePositiveResponse}
          onNegativeResponse={handleNegativeResponse}
        />}
      <div className="content-container">
        <div className="data-container">
          {renderContent()}
        </div>
      </div>
      <footer className="extra-top-padding">
        <p><strong>Last Synced:</strong> {lastSyncTime}</p>
        <p className="footer-note">This information is only parsed locally and is never sent anywhere</p>
      </footer>
    </div>
  );
};

export default Popup;
