import { useState } from 'react'
import './RequestPanel.css'

export default function RequestPanel({ gridId, onRequest }) {
    // Maintain Local Uuid Request State & Error State
    const [localRequestUuid, setLocalRequestUuid] = useState(gridId);
    const [error, setError] = useState("");

    // Constants
    const uuidRegexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    // Update Local Uuid Request based on Keystrokes
    function handleChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Uuid
        setLocalRequestUuid(value);
    }

    // Call a Maze Retrieval via UUID Request
    function handleSubmit(event) {
        // Prevent Form Submission, Unnecessary
        event.preventDefault()

        // Error Handling - Valid UUID
        if (uuidRegexExp.test(localRequestUuid)) {
            // If Valid UUID...
            // Communicate New Settings Change back to Grid Canvas
            onRequest({
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

    return (
        <div id="requestPanel" className="panel section">
            <form onSubmit={handleSubmit}>
                {/* Top Row - Header */}
                <div id="requestHeaderRow">
                    <h3> Load </h3>
                </div>
                <hr/>
                {/* Bottom Row - Input & Submit */}
                <div id="requestInputRow">
                    {/* UUID Input */}
                    <input
                        id="uuidInput"
                        type="text"
                        name="uuid"
                        value={localRequestUuid}
                        placeholder="Retrieve Maze via UUID"
                        onChange={handleChange} 
                    />
                    {/* Submit Button */}
                    <button id="submitButton" type="submit">
                        Load Maze
                    </button>
                </div>
                {/* Error Message - Conditionally Rendered*/}
                {error && (
                    <p class="errorMessage">{error}</p>
                )}
            </form>
        </div>
    );
}