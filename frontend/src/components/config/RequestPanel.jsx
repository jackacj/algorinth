import { useState } from 'react'
import '../../styles/RequestPanel.css'

export default function RequestPanel({ gridId, onRequest }) {
    // Maintain Local Uuid Request
    const [localRequestUuid, setLocalRequestUuid] = useState(gridId);

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

        // Communicate New Settings Change back to Grid Canvas
        onRequest({
            "uuid": localRequestUuid
        });
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
                </div>
            </form>
        </div>
    );
}