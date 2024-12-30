import React, { useState } from "react";
import "./index.css";
import { MdContentCopy } from 'react-icons/md';
import { IoMdCheckbox } from "react-icons/io";

const ProjectItem = ({ projectId, reasons, reviewLevelText, tag }) => {
    const [isProjectIdVisible, setIsProjectIdVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const toggleProjectIdVisibility = () => {
        setIsProjectIdVisible(!isProjectIdVisible);
        setIsCopied(false);
    };

    const handleCopyClick = () => {
        // Copy the project ID to the clipboard
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
                <p className="project-item-label">EQ {Object.values(reasons).length > 1 ? "Reasons" : "Reason"}</p>
                <p className="project-item-value">{Object.values(reasons).join(", ")}</p>

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
        </div>
    );
};

export default ProjectItem;