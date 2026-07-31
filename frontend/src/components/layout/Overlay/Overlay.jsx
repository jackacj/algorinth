import { useState, useEffect } from 'react'
import './Overlay.css'

// Icon & Logo Imports
import logo from "../../../assets/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fa1, fa2, fa3, faGear, faForwardStep, faDice, faCloud, faImage, faEye, faBoltLightning } from '@fortawesome/free-solid-svg-icons'


export default function Overlay({ type, playClick, onClose, gridId, exportColour, onLoadRequest, onExportRequest, onColourChange }) {
    // // Local State for Overlays

    // 'LoadMaze' States
    const [requestUuid, setRequestUuid] = useState("");
    const [error, setError] = useState("");
    // 'ExportMaze' State
    const [exportType, setExportType] = useState("png");
    const [localColour, setLocalColour] = useState(exportColour);

    // Regex for Uuid Validation
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    // Update Uuid Request based on Keystrokes
    function handleUuidChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Uuid
        setRequestUuid(value);
    }

    // Create a Load Request w/ Uuid
    function handleUuidSubmit() {
        // Error Handling - Valid Uuid
        if (uuidRegex.test(requestUuid)) {
            // If Valid UUID...
            // Communicate Load Request Change back to Grid Canvas
            onLoadRequest(requestUuid);
            
            // Clear Error State
            setError("");

            // Close Overlay
            onClose();
        } else {
            // If Invalid UUID...
            // Update Error State
            setError("Invalid UUID, Must be in form 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' using Hexidecimal Characters")
        }
    }

    // Update Export Type based on Selection
    function handleExportTypeChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Uuid
        setExportType(value);
    }

    // Create an Export Request w/ Export Type
    function handleExportSubmit() {
        // Error Handling - Valid Loaded UUID
        if (uuidRegex.test(gridId)) {
            // If Valid UUID...
            // Make Export Request & Update Export Colour
            onColourChange(localColour);
            onExportRequest({
                "type": exportType
            })

            // Clear Error State
            setError("");

            // Close Overlay
            onClose();
        } else {
            // If Invalid Loaded UUID -> No Maze Loaded
            // Update Error State
            setError("No Loaded Maze, Please Load a Maze via UUID or Generate a Maze before Exporting")
        }
    }

    // Update Export Colour w/ Keystrokes
    function handleColourChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Export Colour
        setLocalColour(value);
    }

    // Overlay Content Render Function
    function overlayContent() {
        // Return Card Content based on Overlay Type
        switch(type) {
            // Welcome Overlay
            case "welcome":
                return (
                    <div className="overlayCard welcomeCard" style={{ "background-image": `url(${logo})` }}>
                        <div className="welcomeHeader">
                            <h2> Welcome to Algorinth. </h2>
                        </div>
                        <p> Explore procedural maze generation within this interactive visualiser webapp. </p>
                        <h4> Features : </h4>
                        <ul className="welcomeList">
                            <li>
                                <FontAwesomeIcon icon={faGear} size="lg"/>
                                <span> 6 Unique Generation Algorithms </span> 
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faForwardStep} size="lg"/>
                                <span> Step-by-step Playback </span>  
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDice} size="lg"/>
                                <span> Deterministic Generation w/ Seeds </span>  
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCloud} size="lg"/>
                                <span> Persistent Mazes w/ Save & Load </span>  
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faImage} size="lg"/> 
                                <span> Exporting to Various Image Formats </span> 
                            </li>
                        </ul>
                        <h4> Getting Started : </h4>
                        <ul className="welcomeList splitList">
                            <li>
                                <div>
                                    <FontAwesomeIcon icon={fa1} size="lg"/> 
                                    <span> Select Algorithm, Dimensions & Seed </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <FontAwesomeIcon icon={fa2} size="lg"/> 
                                    <span> Generate </span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <FontAwesomeIcon icon={fa3} size="lg"/> 
                                    <span> Watch Generation Step-by-step </span>
                                </div>
                                <div className="welcomeTip">
                                    <FontAwesomeIcon icon={faEye} size="lg"/> 
                                    <span> Visualise Mode </span>
                                </div>
                            </li>
                        </ul>
                        <p id="welcomeListDivider"> or ... </p>
                        <ul className="welcomeList splitList">
                            <li>
                                <div>
                                    <FontAwesomeIcon icon={fa3} size="lg"/> 
                                    <span> Rapidly Discover New Mazes for your Projects </span>
                                </div>
                                <div className="welcomeTip">
                                    <FontAwesomeIcon icon={faBoltLightning} size="lg"/> 
                                    <span> Instant Mode </span>
                                </div>
                            </li>
                        </ul>
                        <button
                            className="welcomeButton pushableButton" 
                            onClick={() => {
                                playClick();
                                onClose();
                            }}
                        >
                            <span className="pushableButtonFront">
                                Begin Exploring
                            </span>
                        </button>
                    </div>
                );
            
            // Loading Maze Overlay
            case "loadMaze":
                return (
                    <div className="overlayCard">
                        <p> Enter a UUID for a Maze to Load </p>
                        {/* UUID Input */}
                        <fieldset className="requestInput">
                            <legend>UUID</legend>
                            <input
                                id="uuidInputField"
                                type="text"
                                name="uuid"
                                value={requestUuid}
                                placeholder="Retrieve Maze via UUID"
                                onChange={handleUuidChange} 
                            />
                        </fieldset>
                        {/* Error Message - Conditionally Rendered*/}
                        {error && (
                            <p class="errorMessage">{error}</p>
                        )}
                        {/* Load Button */}
                        <button 
                            className="submitButton" 
                            onClick={() => {
                                playClick();
                                handleUuidSubmit();
                            }}
                        >
                            Load Maze
                        </button>
                        {/* Back Button */}
                        <button 
                            onClick={() => {
                                playClick();
                                onClose();
                            }}
                        >
                            Back
                        </button>
                    </div>
                )

            // Exporting Maze Overlay
            case "exportMaze":
                return (
                    <div className="overlayCard">
                        <p> Select an Export Format for the Downloaded Maze </p>
                        {/* Export Type Input */}
                        <fieldset className="requestInput">
                            <legend> Export Type </legend>
                            <select
                                id="exportTypeSelect"
                                name="exportType"
                                value={exportType}
                                onChange={handleExportTypeChange}
                            >
                                <option value="png">Image - PNG</option>
                                <option value="jpeg">Image - JPEG</option>
                                <option value="webp">Image - WEBP</option>
                            </select>
                        </fieldset>
                        {/* Export Colour Input */}
                        <fieldset className="colourInput">
                            <legend> Export Cell Colour </legend>
                            <input type="color" value={localColour} id="exportColourSelect" onChange={handleColourChange} />
                        </fieldset>
                        {/* Error Message - Conditionally Rendered*/}
                        {error && (
                            <p class="errorMessage">{error}</p>
                        )}
                        {/* Export Button */}
                        <button 
                            className="submitButton" 
                            onClick={() => {
                                playClick();
                                handleExportSubmit();
                            }}
                        >
                            Export Maze
                        </button>
                        {/* Back Button */}
                        <button 
                            onClick={() => {
                                playClick();
                                onClose();
                            }}
                        >
                            Back
                        </button>
                    </div>
                );
        }
    }

    return (
        <div id="overlay">
            {overlayContent()}
        </div>
    );
}