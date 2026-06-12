import { useState } from 'react'
import '../../styles/GridCanvas.css'
import Grid from './Grid'
// For Some Reason Won't Shut Up Unless 'configPanel' instead of 'ConfigPanel'
import ConfigPanel from '../config/configPanel'

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

    return (
        <div id="gridCanvas" className="container">
            <p className="debugMarker"> 
                Grid Canvas - {settings.rows} x {settings.cols}, {settings.algorithm} w/ {settings.seed} 
            </p>
            {/* Render Grid */}
            {/* Pass Down Settings' Rows & Cols Props -> In Future, Pass Down 'Grid' State */}
            <Grid 
                rows={settings.rows} 
                cols={settings.cols} 
            />
            {/* Placeholder 'Playback Pane' Div */}
            <div className="container">
                <p className="debugMarker"> Playback Pane </p>
            </div>
            {/* Config Pane */}
            {/* Pass Down Settings Prop, Change Settings State w/ Prop Function */}
            <ConfigPanel  
                settings={settings}
                onSettingsChange={setSettings}
            />
        </div>
    );
}