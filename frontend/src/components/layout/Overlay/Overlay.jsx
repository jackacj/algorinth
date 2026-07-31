import { useState } from 'react'
import './Overlay.css'

export default function Overlay({ type, onClose, onLoadRequest, onExportRequest, onSaveRequest }) {
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

    // Overlay Content Render Function
    function overlayContent() {
        // Return Card Content based on Overlay Type
        switch(type) {
            case "welcome":
                return (
                    <div className="overlayCard">
                        <p>Welcome to Algorith.</p>
                        <button onClick={onClose}>
                            Begin Exploring
                        </button>
                    </div>
                );

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
                        {/* Load Button */}
                        <button 
                            className="submitButton" 
                            onClick={() => handleUuidSubmit()}
                        >
                            Load Maze
                        </button>
                        <button onClick={onClose}>
                            Back
                        </button>
                    </div>
                )
        }
    }

    return (
        <div id="overlay">
            {overlayContent()}
        </div>
    );
}