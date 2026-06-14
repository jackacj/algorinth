import { useState } from 'react'
import { generateMaze } from '../../services/mazeApi'
import '../../styles/GridCanvas.css'
import Grid from './Grid'
import ConfigPanel from '../config/ConfigPanel'
import PlaybackPanel from '../config/PlaybackPanel';

export default function GridCanvas(){
    // "Run" Usage State
    const [isRunActive, setIsRunActive] = useState(false);

    // "Run" Settings State
    const[settings, setSettings] = useState({
        rows: 10,
        cols: 10,
        algorithm: "",
        seed: ""
    });

    // "Run" Grid State
    const[grid, setGrid] = useState(null);
    const[command, setCommand] = useState("");

    // "Run" Playback State
    const[playback, setPlayback] = useState({
        steps: [],
        stepCount: 0,
        currentStep: -1,
        isAuto: false
    });

    // Debug Function for Playback Panel Button Pressing
    function handlePlayback(command) {
        setCommand(command)
    }

    // Handle Settings Update from Config Panel
    async function handleSettingsChange(newSettings) {
        // Update Internal Settings State
        setSettings(newSettings);

        // Make Call to Generate Maze
        try {
            // If Successful... Output Response JSON & Set "Run" as Active
            const mazeRun = await generateMaze(newSettings);
            setIsRunActive(true);
            console.log(mazeRun);
        }
        catch(error) {
            // If Unsuccessful... Log Error & Set "Run" as Inactive
            setIsRunActive(false);
            console.error(error);
        }
    }

    return (
        <div id="gridCanvas" className="container">
            <p className="debugMarker"> 
                Grid Canvas - {settings.rows} x {settings.cols}, {settings.algorithm} w/ {settings.seed}, Current Command - {command}, Run Active - {isRunActive} 
            </p>
            {/* Render Grid */}
            {/* Pass Down Settings' Rows & Cols Props -> In Future, Pass Down 'Grid' State */}
            <Grid 
                rows={settings.rows} 
                cols={settings.cols} 
            />
            {/* Placeholder 'Playback Pane' Div */}
            {/* Pass Down Steps Change Playback State w/ Prop Function */}
            <PlaybackPanel
                isRunActive={isRunActive}
                playback={playback} 
                onPressPlayback={handlePlayback}
            />
            {/* Config Pane */}
            {/* Pass Down Settings Prop, Change Settings State w/ Prop Function */}
            <ConfigPanel  
                settings={settings}
                onSettingsChange={handleSettingsChange}
            />
        </div>
    );
}