import React, { useState, useEffect } from "react";
import "./Popup.css";
import ProjectItem from "../Components/ProjectItem/index"
import { USER_LEVELS } from "../../descriptions";

const Popup = () => {
  const [data, setData] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState("Unknown");

  useEffect(() => {
    const fetchData = async () => {
      const result = await chrome.storage.local.get(["lastEmptyQueueEvent", "lastSyncTime"]);
      if (result.lastEmptyQueueEvent) {
        setData(result.lastEmptyQueueEvent);
        setLastSyncTime(result.lastSyncTime || "Unknown");
      } else {
        setData(null);
      }
    };

    fetchData();
  }, []);

  const getReviewLevelText = (level) => {
    return `${level} (${USER_LEVELS[level] || `${level} Unknown`})`;
  };
  const renderEmptyQueueReasons = (emptyQueueReasons = {}, primaryMap = {}, secondaryMap = {}, projectNames = {}) => {
    const reasons = Object.entries(emptyQueueReasons).map(([projectId, reasons]) => {
      let tag = null;
      if (primaryMap[projectId] != null) {
        tag = "primary";
      } else if (secondaryMap[projectId] != null) {
        tag = "secondary";
      }

      const projectName = projectNames[projectId] || "Unknown Project";

      const reviewLevelText = primaryMap[projectId]
        ? getReviewLevelText(primaryMap[projectId])
        : secondaryMap[projectId]
          ? getReviewLevelText(secondaryMap[projectId])
          : "Unknown";

      return (
        <ProjectItem
          key={`reason-${projectId}`}
          projectId={projectId}
          projectName={projectName} // Passing project name to ProjectItem
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
    const lastEmptyQueueEvent = data;
    if (!lastEmptyQueueEvent) return <p className="text-empty-view">No project data found</p>;

    const {
      currentPrimaryTeamAssignments = [],
      currentSecondaryTeamAssignments = [],
      emptyQueueReasons = {},
    } = lastEmptyQueueEvent;

    const projectNames = Object.fromEntries([
      ...currentPrimaryTeamAssignments.map(({ projectId, projectName }) => [projectId, projectName]),
      ...currentSecondaryTeamAssignments.map(({ projectId, projectName }) => [projectId, projectName])
    ]);

    const primaryMap = Object.fromEntries(
      currentPrimaryTeamAssignments.map(({ projectId, reviewLevel }) => [projectId, String(reviewLevel)])
    );
    const secondaryMap = Object.fromEntries(
      currentSecondaryTeamAssignments.map(({ projectId, reviewLevel }) => [projectId, String(reviewLevel)])
    );

    return (
      <>
        <h2>Projects</h2>
        {renderEmptyQueueReasons(emptyQueueReasons, primaryMap, secondaryMap, projectNames)}
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EmptyQueue</h1>
      </header>
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
