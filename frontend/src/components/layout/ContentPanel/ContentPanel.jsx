import { useState, useEffect, useRef } from 'react'
import { generateMaze, requestMazeById } from '../../../services/mazeApi'
import './ContentPanel.css'

import Grid from '../../maze/Grid/Grid'
import ConfigPanel from '../../config/ConfigPanel/ConfigPanel'
import PlaybackPanel from '../../config/PlaybackPanel/PlaybackPanel'
import RequestPanel from '../../config/RequestPanel/RequestPanel'

import html2canvas from 'html2canvas';

export default function GridCanvas(){
    // Reference for Export
    const exportRef = useRef();

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
    const[finalGrid, setFinalGrid] = useState([]);
    const[gridId, setGridId] = useState("");
    const [isRunActive, setIsRunActive] = useState(false);

    // Playback State
    // Stock Playback StepsPerSecond - Temporary
    let stockStepsPerSecond = 5;
    // Initialise w/ Empty Playback & No Command
    const[playback, setPlayback] = useState({
        steps: [],
        currentStep: 0,
        isAuto: false,
        isAutoForward: true,
        stepsPerSecond: stockStepsPerSecond
    });
    const[command, setCommand] = useState("");

    // // Grid Canvas Effects

    // Autostep Effect

    useEffect(() => {
        // If not isAuto... Do Nothing
        if (!playback.isAuto) {
            return;
        }

        // Create Timeout to Trigger Phantom Button Press every 100ms
        const timeout = setTimeout(() => {
            if (playback.isAutoForward) {
                handlePlayback("STEP_FORWARD");
            } else {
                handlePlayback("STEP_BACKWARD");
            }
        }, 1000 / playback.stepsPerSecond);

        return () => clearTimeout(timeout);
    }, [
        // Dependent States
        playback.isAuto,
        playback.isAutoForward, 
        playback.currentStep, 
        playback.stepsPerSecond
    ]);

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

    // // Grid Mutation Functions
    // TYPES & DATA
    // "Initialise" - is_open: bool
    // "Create Path" - from_cell: (y,x), to_cell: (y,x)
    // "Remove Path" - from_cell: (y,x), to_cell: (y,x)
    // "Visit" - cell: (y,x)
    // "Union" - set_a: (y,x), set_b: (y,x)
    function mutateGridForward(step, localGrid) {
        // Select Mutation Type
        switch(step.type) {
            case "Initialise":
                // PROBABLY NEVER EXECUTED
                // Create New Open/Closed Grid
                localGrid = step.data.is_open 
                    ? createOpenGrid(settings.rows, settings.cols)
                    : createClosedGrid(settings.rows, settings.cols);
                break;

            case "Create Path":
                // Create Path in Grid
                localGrid = modifyPath(
                    step.data.from_cell,
                    step.data.to_cell,
                    true,
                    localGrid
                );
                break;


            case "Remove Path":
                // Remove Path in Grid
                localGrid = modifyPath(
                    step.data.from_cell,
                    step.data.to_cell,
                    false,
                    localGrid
                );
                break;

            case "Visit":
                // Set Cell's "Visited Status" to True
                localGrid[step.data.cell[0]][step.data.cell[1]].visited = true;
                break;

            case "Union":
                // Future Union Rendering
        }

        // Return Mutated Grid
        return localGrid;
    }

    function mutateGridBackward(step, localGrid) {
        // Select Mutation Type
        switch (step.type) {
            case "Create Path":
                // Perform Inverse Action
                // Remove Path in Grid
                localGrid = modifyPath(
                    step.data.from_cell,
                    step.data.to_cell,
                    false,
                    localGrid
                );
                break;

            case "Remove Path":
                // Perform Inverse Action
                // Create Path in Grid
                localGrid = modifyPath(
                    step.data.from_cell,
                    step.data.to_cell,
                    true,
                    localGrid
                );
                break;

            case "Visit":
                // Perform Inverse Action
                // Set Cell's "Visited Status" to False
                localGrid[step.data.cell[0]][step.data.cell[1]].visited = false;
                break; 

            case "Union":
                // Perform Inverse Action
                // Future "Dis-Union" Rendering
        }

        // Return Mutated Grid
        return localGrid;
    }

    // Creating a Path in a given LocalGrid
    function modifyPath(fromCell, toCell, isPath, localGrid) {
        // Find Direction between Cells
        let dy = toCell[0] - fromCell[0];
        let dx = toCell[1] - fromCell[1];

        // Modify Cell Entries in LocalGrid
        if (dy === -1 && dx === 0) {
            // toCell is North of fromCell
            localGrid[fromCell[0]][fromCell[1]].paths.north = isPath;
            localGrid[toCell[0]][toCell[1]].paths.south = isPath;

        } else if (dy === 1 && dx === 0) {
            // toCell is South of fromCell
            localGrid[fromCell[0]][fromCell[1]].paths.south = isPath;
            localGrid[toCell[0]][toCell[1]].paths.north = isPath;
            
        } else if (dy === 0 && dx === -1) {
            // toCell is West of fromCell
            localGrid[fromCell[0]][fromCell[1]].paths.west = isPath;
            localGrid[toCell[0]][toCell[1]].paths.east = isPath;

        } else if (dy === 0 && dx === 1) {
            // toCell is East of fromCell
            localGrid[fromCell[0]][fromCell[1]].paths.east = isPath;
            localGrid[toCell[0]][toCell[1]].paths.west = isPath;
        }

        // Return LocalGrid w/ Modified Path
        return localGrid;
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
            const mazeId = mazeRun.maze_id;
            const steps = mazeRun.steps.list;
            const firstStep = steps[0];
            const initialGrid =
                firstStep?.data?.is_open 
                    ? createOpenGrid(newSettings.rows, newSettings.cols)
                    : createClosedGrid(newSettings.rows, newSettings.cols);
            const localFinalGrid = mazeRun.final_maze;
            
            // Update All Appropriate States
            // Grids, Playback, Run & Command
            setGrid(initialGrid);
            setPlayback(prev => ({
                ...prev,
                steps: steps,
                currentStep: 0,
                isAuto: false,
                isAutoForward: true
            }));
            setIsRunActive(true);
            setCommand("");
            setGridId(mazeId);
            setFinalGrid(localFinalGrid);

        } catch (error) {
            // If Error... Report & Update Run State
            console.error(error);
            setIsRunActive(false);
        }
    }

    // // Playback Functions

    // Stepping Forward
    function stepForward(localPlayback, localGrid) {
        // Increment Step
        // Check Bounds
        if (localPlayback.currentStep >= localPlayback.steps.length - 1) {
            // If No Future Steps Left... Stop Autostep as Precaution & Abandon Command
            localPlayback.isAuto = false;
            return [localPlayback, localGrid];
        }
        localPlayback.currentStep += 1

        // Mutate Grid Forwards Based On Command
        localGrid = mutateGridForward(localPlayback.steps[localPlayback.currentStep], localGrid);

        // Return Modified localPlayback & localGrid
        return [localPlayback, localGrid];
    }

    // Stepping Backward
    function stepBackward(localPlayback, localGrid) {
        // Check Bounds
        if (localPlayback.currentStep <= 0) {
            // If No Previous Steps Left... Stop Autostep as Precaution & Abandon Command
            localPlayback.isAuto = false;
            return [localPlayback, localGrid];
        }

        // Mutation Grid Backwards Based On Command
        localGrid = mutateGridBackward(localPlayback.steps[localPlayback.currentStep], localGrid);

        // Decrement Step
        localPlayback.currentStep -= 1

        // Return Modified localPlayback & localGrid
        return [localPlayback, localGrid];
    }

    // Jumping to Initial Step in Generation
    function jumpToStart(localPlayback, localGrid) {
        // Check Bounds -> Redundant Action
        if (localPlayback.currentStep == 0) {
            // Return Existing
            return [localPlayback, localGrid]
        }

        // Instantiate Grid Again at First Step
        localGrid = 
            localPlayback.steps[0].data.is_open 
                ? createOpenGrid(settings.rows, settings.cols) 
                : createClosedGrid(settings.rows, settings.cols);

        // Set Step to Initial Step
        localPlayback.currentStep = 0;

        // Return Modified localPlayback & localGrid
        return [localPlayback, localGrid];
    }

    // Jumping to Final Step in Generation
    function jumpToEnd(localPlayback, localGrid) {
        // Check Bounds -> Redundant Action
        if (localPlayback.currentStep == (localPlayback.steps.length - 1)) {
            // Return Existing
            return [localPlayback, localGrid]
        }

        // Set Local Grid to the Final Grid State
        localGrid = finalGrid;

        // Set Step to Final Step
        localPlayback.currentStep = localPlayback.steps.length - 1;

        // Return Modified localPlayback & localGrid
        return [localPlayback, localGrid];
    }

    // Playback Controls
    function handlePlayback(cmd) {
        console.log("handlePlayback:", cmd, performance.now());

        // Create Local Clones of 'Playback' & 'Grid' States
        let localPlayback = {
            ...playback
        };
        let localGrid = structuredClone(grid);

        // Select Command -> Expand In Future
        switch(cmd) {
            case "STEP_FORWARD":
                // Step Forward
                [localPlayback, localGrid] = stepForward(localPlayback, localGrid);
                break;

            case "STEP_BACKWARD":
                // Step Backward
                [localPlayback, localGrid] = stepBackward(localPlayback, localGrid);
                break;

            case "AUTOSTEP_PLAY_FORWARD":
                // Enable Autostep
                localPlayback.isAuto = true;
                // Set Direction to Forward
                localPlayback.isAutoForward = true;
                // Set Autostep Speed to Stock Speed = Temporary
                localPlayback.stepsPerSecond = stockStepsPerSecond;
                break;

            case "AUTOSTEP_PLAY_BACKWARD":
                // Enable Autostep
                localPlayback.isAuto = true;
                // Set Direction to Backward
                localPlayback.isAutoForward = false;
                // Set Autostep Speed to Stock Speed = Temporary
                localPlayback.stepsPerSecond = stockStepsPerSecond;
                break;

            case "AUTOSTEP_PAUSE":
                // Disable Autostep
                localPlayback.isAuto = false;
                break;

            case "JUMP_START":
                // Jump to First Position
                [localPlayback, localGrid] = jumpToStart(localPlayback, localGrid);
                break;

            case "JUMP_END":
                // Jump to End Position
                [localPlayback, localGrid] = jumpToEnd(localPlayback, localGrid);
                break;
        }

        // Set Command ,Playback & Grid States
        setGrid(localGrid);
        setCommand(cmd);
        setPlayback( prev => ({
            ...prev,
            currentStep: localPlayback.currentStep,
            isAuto: localPlayback.isAuto,
            isAutoForward: localPlayback.isAutoForward,
            stepsPerSecond: localPlayback.stepsPerSecond
        }));
    }
    
    // Playback Speed Controls
    function handleSpeedChange(newStepsPerSecond) {
        // Update Playback Steps per Second
        setPlayback( prev => ({
            ...prev,
            stepsPerSecond: newStepsPerSecond
        }));
    }

    // Request Maze via UUID
    async function handleMazeRequestById(request) {
        try {
            // Request an Existing Maze from Backend via Id
            const mazeRun = await requestMazeById(request);

            // Create Initial Settings
            const newSettings = mazeRun.settings;

            // Create Initial Grid from First Step Information
            const mazeId = mazeRun.maze_id;
            const steps = mazeRun.steps.list;
            const firstStep = steps[0];
            const initialGrid =
                firstStep?.data?.is_open 
                    ? createOpenGrid(newSettings.rows, newSettings.cols)
                    : createClosedGrid(newSettings.rows, newSettings.cols);
            
            // Update All Appropriate States
            // Grid, Playback, Run & Command
            setGrid(initialGrid);
            setSettings(newSettings);
            setPlayback(prev => ({
                ...prev,
                steps: steps,
                currentStep: 0,
                isAuto: false,
                isAutoForward: true
            }));
            setIsRunActive(true);
            setCommand("");
            setGridId(mazeId);

        } catch (error) {
            // If Error... Report & Update Run State
            console.error(error);
            setIsRunActive(false);
        }
    }

    // Download Maze via 'html-2-canvas' -> Not Service Due to Reference Hook
    async function handleDownload() {
        // Abandon Command if No Active Run
        if (!isRunActive) {
            return;
        }

        // Grab Grid by Reference & Create Canvas from JSX
        const element = exportRef.current;
        const canvas = await html2canvas(element);

        // Create a DataURL using Canvas & Download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `maze_${gridId}.png`;
        link.click();
    }

    // Rendering
    return (
        <div id="contentPanel">
            {/* Maze Panel -> Conditionally Rendered */}
            {isRunActive && (
                <div id="mazePanel" className="section">
                    {/* Grid Panel */}
                    <div id="gridPanel" className="section">
                        {/* UUID/Name & Export Button */}
                        <div id="gridLabel">
                            <p>{gridId}</p>
                            <button 
                                id="exportButton"
                                onClick={() => handleDownload()}
                            >
                                Export Maze 
                            </button>
                        </div>
                        {/* Grid -> Extra Hidden Final Grid w/ Exporting Reference */}
                        <Grid grid={grid} />
                        <div id="hiddenFinalGrid">
                            <div ref={exportRef}>
                                <Grid grid={finalGrid} />
                            </div>
                        </div>
                        <div ref={exportRef}>
                            <Grid grid={finalGrid} />
                        </div>
                    </div>
                    {/* Playback Panel - Conditionally Rendered */}
                    <div>
                        <PlaybackPanel
                            playback={playback}
                            onPressPlayback={handlePlayback}
                            onSpeedChange={handleSpeedChange}
                        />
                    </div>
                </div>
            )}
            
            {/* IO Panel */}
            <div id="ioPanel">
                {/* Config Panel */}
                <ConfigPanel
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                />
                {/* Request Panel */}
                <RequestPanel
                    gridId={gridId}
                    onRequest={handleMazeRequestById}
                />
            </div>
        </div>
    );
}