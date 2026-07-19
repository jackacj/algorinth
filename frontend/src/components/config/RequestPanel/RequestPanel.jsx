import { useState } from 'react'
import './RequestPanel.css'

export default function RequestPanel({ gridId, onUUIDRequest, onExportRequest }) {
    // Maintain Local Uuid Request State, Export Type State & Error State
    const [localRequestUuid, setLocalRequestUuid] = useState(gridId);
    const [error, setError] = useState("");
    const [exportType, setExportType] = useState("png");

    // Constants
    const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    // Update Local Uuid Request based on Keystrokes
    function handleUUIDChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Uuid
        setLocalRequestUuid(value);
    }

    function handleExportTypeChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Uuid
        setExportType(value);
    }

    // Call a Maze Retrieval via UUID Request
    function handleUUIDSubmit() {
        // Error Handling - Valid Local UUID
        if (uuidRegexExp.test(localRequestUuid)) {
            // If Valid UUID...
            // Communicate Load Request Change back to Grid Canvas
            onUUIDRequest({
                "uuid": localRequestUuid
            });
            // Clear Error State
            setError("");
        } else {
            // If Invalid UUID...
            // Update Error State
            setError("Invalid UUID, Must be in form 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' using Hexidecimal Characters")
        }
    }

    function handleExportSubmit() {
        // Error Handling - Valid Loaded UUID
        if (uuidRegexExp.test(gridId)) {
            // If Valid UUID...
            // Communicate Export Request back to Grid Canvas
            onExportRequest({
                "type": exportType
            });
            // Clear Error State
            setError("");
        } else {
            // If Invalid Loaded UUID -> No Maze Loaded
            // Update Error State
            setError("No Loaded Maze, Please Load a Maze via UUID or Generate a Maze before Exporting")
        }
    }

    return (
        <div id="requestPanel" className="panel section">  
            {/* Top Row - Header */}
            <div id="requestHeaderRow">
                <h3> Load / Export </h3>
            </div>
            <hr/>
            {/* Bottom Row - Input & Submit */}
            <div className="requestInputRow">
                {/* UUID Input */}
                <fieldset className="requestInput">
                    <legend>UUID</legend>
                    <input
                        id="uuidInputField"
                        type="text"
                        name="uuid"
                        value={localRequestUuid}
                        placeholder="Retrieve Maze via UUID"
                        onChange={handleUUIDChange} 
                    />
                </fieldset>
                {/* Load Button */}
                <button 
                    className="submitButton" 
                    onClick={() => handleUUIDSubmit()}
                >
                    Load Maze
                </button>
            </div>
            <div className="requestInputRow">
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
                {/* Export Button */}
                <button 
                    className="submitButton" 
                    onClick={() => handleExportSubmit()}
                >
                    Export Maze
                </button>
            </div>
            {/* Error Message - Conditionally Rendered*/}
            {error && (
                <p class="errorMessage">{error}</p>
            )}
        </div>
    );
}