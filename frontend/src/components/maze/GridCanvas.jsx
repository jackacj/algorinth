import { useState } from 'react'
import { generateMaze } from '../../services/mazeApi'
import '../../styles/GridCanvas.css'

import Grid from './Grid'
import ConfigPanel from '../config/ConfigPanel'
import PlaybackPanel from '../config/PlaybackPanel';

export default function GridCanvas(){

    // // Grid Canvas State

    // Settings State
    // Initialise w/ Stock Settings
    const[settings, setSettings] = useState({
        rows: 10,
        cols: 10,
        algorithm: "",
        seed: ""
    });

    // Grid State & "Run" State
    // Initialise w/ Empty Grid & No "Run"
    const[grid, setGrid] = useState([]);
    const [isRunActive, setIsRunActive] = useState(false);

    // Playback State
    // Initialise w/ Empty Playback & No Command
    const[playback, setPlayback] = useState({
        steps: [],
        currentStep: 0,
        isAuto: false
    });
    const[command, setCommand] = useState("");

    // // Grid Building Functions

    // Create a "Closed" Grid (No Paths)
    function createClosedGrid(rows, cols) {
        return Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => ({
                row: row,
                col: col,
                visited: false,
                paths: {
                    north: false,
                    south: false,
                    east: false,
                    west: false
                }
            }))
        );
    }

    // Create an "Open" Grid (All Paths Except Edges)
    function createOpenGrid(rows, cols) {
        return Array.from({ length: rows }, (_, row) =>
            Array.from({ length: cols }, (_, col) => ({
                row,
                col,
                visited: false,
                paths: {
                    north: !(row === 0),
                    south: !(row === rows - 1),
                    east: !(col === cols - 1),
                    west: !(col === 0)
                }
            }))
        );
    }

    // // Settings & Backend Flow

    // Process Settings Update from Config Panel
    async function handleSettingsChange(newSettings) {
        // Update Config State
        setSettings(newSettings);

        try {
            // Request New Maze from Backend
            const mazeRun = await generateMaze(newSettings);

            // Create Initial Grid from First Step Information
            const steps = mazeRun.steps.list;
            const firstStep = steps[0];
            const initialGrid =
                firstStep?.Data?.is_open 
                    ? createOpenGrid(newSettings.rows, newSettings.cols)
                    : createClosedGrid(newSettings.rows, newSettings.cols);
            
            // Update All Appropriate States
            // Grid, Playback, Run & Command
            setGrid(initialGrid);
            setPlayback({
                steps: steps,
                currentStep: 0,
                isAuto: false
            });
            setIsRunActive(true);
            setCommand("");

        } catch (error) {
            // If Error... Report & Update Run State
            console.error(error);
            setIsRunActive(false);
        }
    }

    // Playback Controls
    // TO BE EXPANDED
    function handlePlayback(cmd) {
        // Update Command & Playback States
        // TEMPORARY
        setCommand(cmd);
        setPlayback( prev => ({
            ...prev,
            currentStep: prev.currentStep
        }));
    }

    // Rendering
    return (
        <div id="gridCanvas" className="container">

            <p className="debugMarker">
                Grid Canvas - {settings.rows} x {settings.cols}
                {" "}| {settings.algorithm}
                {" "}| {settings.seed}
                {" "}| {command}
                {" "}| Run: {isRunActive ? "active" : "inactive"}
            </p>

            {/* Grid */}
            <Grid grid={grid} />

            {/* Playback Panel - Conditionally Rendered */}
            {isRunActive && (
                <PlaybackPanel
                    playback={playback}
                    onPressPlayback={handlePlayback}
                />
            )}

            {/* Config Panel */}
            <ConfigPanel
                settings={settings}
                onSettingsChange={handleSettingsChange}
            />

        </div>
    );
}