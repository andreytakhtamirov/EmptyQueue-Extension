import React, { useState } from "react";
import "./index.css";
import { MdContentCopy } from 'react-icons/md';
import { IoMdCheckbox } from "react-icons/io";
import Tooltip from "../Tooltip/index";
import { EQ_REASONS } from "../../../descriptions";

const ProjectItem = ({ projectId, projectName, reasons, reviewLevelText, tag }) => {
    const [isProjectIdVisible, setIsProjectIdVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    function tooltipForReason(reason) {
        return EQ_REASONS[reason] ? <span><b>Maybe:</b> {EQ_REASONS[reason]}</span> : "Unknown";
    }

    const toggleProjectIdVisibility = () => {
        setIsProjectIdVisible(!isProjectIdVisible);
        setIsCopied(false);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(projectId).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <div className="project-container">
            {tag && (
                <p className={`tag ${tag === "primary" ? "primary" : tag === "secondary" ? "secondary" : ""}`}>
                    {tag}
                </p>
            )}
            <div className="project-items">
                <p className="project-item-name">{projectName}</p>

                <p className="project-item-label">
                    EQ {Object.values(reasons).length > 1 ? "Reasons" : "Reason"}
                </p>
                <div className="project-item-value">
                    {Object.entries(reasons).map(([key, value]) => (
                        <div key={key} className="reason-item">
                            <span>{value}</span>
                            <div className="tooltip-container">
                                <span className="question-mark">?</span>
                                <Tooltip text={tooltipForReason(value)} />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="project-item-label">User Level</p>
                <p className="project-item-value">{reviewLevelText}</p>

                <p className="project-item-label">Project ID</p>
                <div className="project-id-container">
                    <div className="project-id project-item-value" onClick={toggleProjectIdVisibility}>
                        {isProjectIdVisible ? (
                            <p>{projectId}</p>
                        ) : (
                            <p>Click to reveal</p>
                        )}
                    </div>
                    <button className="copy-button" onClick={handleCopyClick} title="Copy to Clipboard">
                        {isCopied ? <IoMdCheckbox /> : < MdContentCopy />}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ProjectItem;
