import { useState } from 'react'
import './ConfigPanel.css'

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ConfigPanel({ settings, onSettingsChange }) {
    // Maintain Local Settings & Error State
    const [localSettings, setLocalSettings] = useState(settings);
    const [error, setError] = useState("");

    // Constants - Input Validation/Settings
    const maxSeedLength = 32;
    const dimBounds = [2, 50];
    const algoToText = {
        "iterative_dfs": {
            "title": "Iterative Depth-First Search (Recursive Backtracker)",
            "desc": "DFS begins at a random cell and repeatedly moves to a random unvisited neighbour, carving passages as it explores. When it reaches a dead end, it backtracks to the most recent cell with unexplored neighbours and continues until every cell has been visited.",
            "traits": ["Long/Winding Corridors", "Few Branches", "Dead Ends"],
            "useCase": "Classic Maze Puzzles and/or Video Games w/ 'Main Path'.",
            "speed": 5,
            "complexity": 1,
            "variety": 2
        },
        "kruskal": {
            "title": "Randomised Kruskal's Algorithm",
            "desc": "Every cell starts as it's own independent set. Walls are considered in a random order and are removed only if doing so connects two previously separate sets. This continues until all cells belong to a single connected maze.",
            "traits": ["Short Corridors", "Unpredictable"],
            "useCase": "Balanced Maze Puzzles.",
            "speed": 4,
            "complexity": 3,
            "variety": 3
        },
        "prim_simple": {
            "title": "Simplified Randomised Prim's Algorithm",
            "desc": "Starts from a single random cell and grows the maze outward. Frontier walls are chosen randomly, and passages are carved whenever they connect the explored region to an unexplored cell until the entire grid has been incorporated. No weights are involved (Simplified).",
            "traits": ["Highly Interconnected", "Many Branches", "Central Expansion"],
            "useCase": "Exploration-heavy Experiences w/ Frequent Decision Making.",
            "speed": 4,
            "complexity": 2,
            "variety": 3
        },
        "wilson": {
            "title": "Wilson's Algorithm (Random Walk)",
            "desc": "Repeatedly performs random walks from unvisited cells until they connect with the existing maze. Any loops formed during a walk are removed before the path is permanently added, ensuring every addition remains efficient and loop-free.",
            "traits": ["Statistically Unbiased", "Perfect Mazes", "Highly Natural/Varied"],
            "useCase": "Scientific Research & Demonstrations.",
            "speed": 2,
            "complexity": 4,
            "variety": 5,
        },
        "aldous_broder": {
            "title": "Aldous-Broder Algorithm",
            "desc": "Performs a single, totally unrestricted random walk through the grid. Whenever a cell is visited for the first time, a passage is carved to it. Many cells are revisited before the maze is complete but this simple process eventually produces a perfect maze.",
            "traits": ["Statistically Unbiased", "Perfect Mazes", "Extremely Simple"],
            "useCase": "Benchmarking & Demonstration, Too Slow for Most Applications.",
            "speed": 1,
            "complexity": 1,
            "variety": 5,
        },
        "recursive_division": {
            "title": "Recursive Division Algorithm",
            "desc": "Begins with an open area and repeatedly divides it into smaller chambers by adding walls. Each new wall contains a single opening, ensuring all regions remain connected while progressively increasing the maze's complexity. Scales incredibly well.",
            "traits": ["Rectangular Chambers", "Long, Straight Walls"],
            "useCase": "Architectural or Level-based Environments.",
            "speed": 5,
            "complexity": 4,
            "variety": 2,
        }
    };

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
        <div id="configPanel" className="panel section">
            <form onSubmit={handleSubmit}>
                {/* Top Row - Header*/}
                <div id="configHeaderRow">
                    <h3> Generate </h3>
                </div>
                <hr/>
                {/* 2nd Row - Settings Input */}
                <div id="configInputRow">
                    {/* Height/Rows Input */}
                    <div id="configDimensions">
                        <fieldset>
                            <legend>Height</legend>
                            <input
                                id="heightInput"
                                type="number"
                                name="rows"
                                value={localSettings.rows}
                                min={dimBounds[0]}
                                max={dimBounds[1]}
                                onChange={handleChange} 
                            />
                        </fieldset>
                        <FontAwesomeIcon id="configDimensionsDivider" icon={faXmark} />
                        {/* Width/Cols Input */}
                        <fieldset>
                            <legend>Width</legend>
                            <input
                                id="widthInput"
                                type="number"
                                name="cols"
                                min={dimBounds[0]}
                                max={dimBounds[1]}
                                value={localSettings.cols}
                                onChange={handleChange} 
                            />
                        </fieldset>
                    </div>
                    {/* Algorithm Dropdown */}
                    <fieldset>
                        <legend>Algorithm</legend>
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
                    </fieldset>
                    
                    {/* Seed Input */}
                    <fieldset>
                        <legend>Seed</legend>
                        <input
                            id="seedInput"
                            type="text"
                            name="seed"
                            value={localSettings.seed}
                            maxLength={maxSeedLength}
                            placeholder="Leave Blank for None"
                            onChange={handleChange} 
                        />
                    </fieldset>
                </div>
                {/* 3rd Row - Dynamic Content -> Dynamically Rendered */}
                {(localSettings.algorithm !== "") && (
                    <div id="configContentRow" className="panel">
                        <div id="configContentText">
                            <h3>{algoToText[localSettings.algorithm].title}</h3>
                            <div id="traitRow">
                                {algoToText[localSettings.algorithm].traits.map(trait => 
                                    <span className="trait" key={trait}>{trait}</span>
                                )}
                            </div>
                            <p>{algoToText[localSettings.algorithm].desc}</p>
                            <span id="configContentTextUseCase">Use Case: </span>
                            <span>{algoToText[localSettings.algorithm].useCase}</span>
                        </div>
                        <div id="configContentImg">
                            Image
                        </div>
                    </div>
                )}
                {/* Bottom Row - Submit Button */}
                <div id="configButtonRow">
                    {/* Submit Button */}
                    <button id="configSubmit" type="submit">
                        Apply Settings
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