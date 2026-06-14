import { useState } from 'react'
import '../../styles/GridCanvas.css'
import Grid from './Grid'
import ConfigPanel from '../config/ConfigPanel'
import PlaybackPanel from '../config/PlaybackPanel';

export default function GridCanvas(){
    // Grid Usage State
    const [isRunActive, setIsRunActive] = useState(false);

    // "Run" Settings State
    const[settings, setSettings] = useState({
        rows: 10,
        cols: 10,
        algorithm: "",
        seed: ""
    });

    // "Run" Playback State
    const[steps, setSteps] = useState([]);
    const[currentStep, setCurrentStep] = useState(-1);
    const[isPlaying, setIsPlaying] = useState(false);

    // Debug Function for Playback Panel Button Pressing
    const[command, setCommand] = useState("");
    function handlePlaybackButton(command) {
        setCommand(command)
    }

    return (
        <div id="gridCanvas" className="container">
            <p className="debugMarker"> 
                Grid Canvas - {settings.rows} x {settings.cols}, {settings.algorithm} w/ {settings.seed}, Current Command - {command} 
            </p>
            {/* Render Grid */}
            {/* Pass Down Settings' Rows & Cols Props -> In Future, Pass Down 'Grid' State */}
            <Grid 
                rows={settings.rows} 
                cols={settings.cols} 
            />
            {/* Placeholder 'Playback Pane' Div */}
            <PlaybackPanel 
                onPressStepForward={handlePlaybackButton} 
                onPressStepBackward={handlePlaybackButton} 
                onPressAutostepPlay={handlePlaybackButton} 
                onPressAutostepPause={handlePlaybackButton}
            />
            {/* Config Pane */}
            {/* Pass Down Settings Prop, Change Settings State w/ Prop Function */}
            <ConfigPanel  
                settings={settings}
                onSettingsChange={setSettings}
            />
        </div>
    );
}