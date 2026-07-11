import { useState } from 'react'
import '../../styles/RequestPanel.css'

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
        <div id="requestPanel" className="container">
            <p className="debugMarker"> Request Panel </p>
            <form onSubmit={handleSubmit} className="container requestForm">
                {/* Top Row - UUID Input */}
                    <div className="container uuidRow">
                        {/* Seed Input */}
                        <input
                            type="text"
                            name="uuid"
                            value={localRequestUuid}
                            placeholder="Retrieve Maze via UUID"
                            onChange={handleChange} 
                        />
                    </div>
                {/* Bottom Row - Submit Button */}
                <div className="container submitRow">
                    {/* Submit Button */}
                    <button type="submit">
                        Load Maze
                    </button>
                    {/* Error Message - Conditionally Rendered*/}
                    {error && (
                        <span class="errorMessage">{error}</span>
                    )}
                </div>
            </form>
        </div>
    );
}