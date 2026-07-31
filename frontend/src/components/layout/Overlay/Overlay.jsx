import { useState } from 'react'
import './Overlay.css'

export default function Overlay({ type, onClose, gridId, onLoadRequest, onExportRequest, onSaveRequest }) {
    // // Local State for Overlays

    // 'LoadMaze' States
    const [requestUuid, setRequestUuid] = useState("");
    const [error, setError] = useState("");
    // 'ExportMaze' State
    const [exportType, setExportType] = useState("png");

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
            // Communicate Export Request back to Grid Canvas
            onExportRequest({
                "type": exportType
            });

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

    // Overlay Content Render Function
    function overlayContent() {
        // Return Card Content based on Overlay Type
        switch(type) {
            // Welcome Overlay
            case "welcome":
                return (
                    <div className="overlayCard">
                        <p>Welcome to Algorith.</p>
                        <button onClick={onClose}>
                            Begin Exploring
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
                            onClick={() => handleUuidSubmit()}
                        >
                            Load Maze
                        </button>
                        {/* Back Button */}
                        <button onClick={onClose}>
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
                            <legend>Export Type</legend>
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
                        {/* Error Message - Conditionally Rendered*/}
                        {error && (
                            <p class="errorMessage">{error}</p>
                        )}
                        {/* Export Button */}
                        <button 
                            className="submitButton" 
                            onClick={() => handleExportSubmit()}
                        >
                            Export Maze
                        </button>
                        {/* Back Button */}
                        <button onClick={onClose}>
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