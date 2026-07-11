import { useState } from 'react'
import './ConfigPanel.css'

export default function ConfigPanel({ settings, onSettingsChange }) {
    // Maintain Local Settings & Error State
    const [localSettings, setLocalSettings] = useState(settings);
    const [error, setError] = useState("");

    // Constants - Input Validation/Settings
    const maxSeedLength = 32;
    const dimBounds = [2, 50]

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
        <div id="configPanel" className="panel">
            <form onSubmit={handleSubmit}>
                {/* Top Row - Header*/}
                <div id="configHeaderRow">
                    <p> Generate </p>
                    <span class="errorMessage"> Placeholder Error </span>
                </div>
                {/* 2nd Row - Settings Input */}
                <div id="configInputRow">
                    {/* Height/Rows Input */}
                    <div id="configDimensions">
                        <input
                            id="heightInput"
                            type="number"
                            name="rows"
                            value={localSettings.rows}
                            min={dimBounds[0]}
                            max={dimBounds[1]}
                            onChange={handleChange} 
                        />
                        <p>x</p>
                        {/* Width/Cols Input */}
                        <input
                            id="widthInput"
                            type="number"
                            name="cols"
                            min={dimBounds[0]}
                            max={dimBounds[1]}
                            value={localSettings.cols}
                            onChange={handleChange} 
                        />
                    </div>
                    {/* Algorithm Dropdown */}
                    <select
                        id="algorithmInput"
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
                    {/* Seed Input */}
                    <input
                        id="seedInput"
                        type="text"
                        name="seed"
                        value={localSettings.seed}
                        maxlength={maxSeedLength}
                        placeholder="Leave Blank for None"
                        onChange={handleChange} 
                    />
                </div>
                {/* 3rd Row - Dynamic Content */}
                <div id="configContentRow">
                    Dynamic Content Placeholder
                </div>
                {/* Bottom Row - Submit Button */}
                <div id="configButtonRow">
                    {/* Submit Button */}
                    <button id="configSubmit" type="submit">
                        Apply Settings
                    </button>
                </div>
            </form>
        </div>
    );
}