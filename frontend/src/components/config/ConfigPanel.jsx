import { useState } from 'react'
import '../../styles/ConfigPanel.css'

export default function ConfigPanel({ settings, onSettingsChange }) {
    // Maintain Local Settings
    const [localSettings, setLocalSettings] = useState(settings);

    // Update Local Settings based on Keystrokes
    function handleChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Keystroke Changes to Local Settings
        setLocalSettings((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Apply Local Settings to Actual Settings
    function handleSubmit(event) {
        // Prevent Form Submission, Unnecessary
        event.preventDefault()

        // Communicate New Settings Change back to Grid Canvas
        onSettingsChange({
            ...localSettings,
            // Make Sure 'Rows' & 'Cols' are Passed as Numbers
            rows: Number(localSettings.rows),
            cols: Number(localSettings.cols)
        });
    }

    return (
        <div id="configPanel" className="container">
            <p className="debugMarker"> Config Panel </p>
            <form onSubmit={handleSubmit} className="container configForm">
                {/* Top Area - Settings & Content*/}
                <div className="container topArea">
                    {/* Left Area - Settings */}
                    <div className="container settingsArea">
                        {/* Top Row - Dimensions Input */}
                        <div className="container dimensionsRow">
                            {/* Height/Rows Input */}
                            <input
                                type="number"
                                name="rows"
                                value={localSettings.rows}
                                onChange={handleChange} 
                            />
                            <p>x</p>
                            {/* Width/Cols Input */}
                            <input
                                type="number"
                                name="cols"
                                value={localSettings.cols}
                                onChange={handleChange} 
                            />
                        </div>
                        {/* Middle Row - Algorithm Dropdown */}
                        <div className="container algorithmRow">
                            {/* Algorithm Dropdown Input */}
                            <select
                                name="algorithm"
                                value={localSettings.algorithm}
                                onChange={handleChange}
                            >
                                <option value="" disabled selected hidden>Choose an Algorithm...</option>
                                <option value="iterative_dfs">Iterative DFS</option>
                                <option value="kruskal">Kruskal's</option>
                                <option value="prim_simple">Simplified Prim's</option>
                                <option value="wilson">Wilson's</option>
                                <option value="aldous_broder">Aldous-Broder</option>
                                <option value="recursive_division">Recursive Division</option>
                            </select>
                        </div>
                        {/* Bottom Row - Seed Input */}
                        <div className="container seedRow">
                            {/* Seed Input */}
                            <input
                                type="text"
                                name="seed"
                                value={localSettings.seed}
                                placeholder="Leave Blank for None"
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    {/* Right Area - Content */}
                    <div className="container contentArea">
                        Dynamic Content Placeholder
                    </div>
                </div>
                {/* Button Area - Submit Button*/}
                <div className="container bottomArea">
                    {/* Submit Button */}
                    <button type="submit">
                        Apply Settings
                    </button>
                </div>
            </form>
        </div>
    );
}