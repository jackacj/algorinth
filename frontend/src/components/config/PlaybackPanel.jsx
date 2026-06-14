import { useState } from 'react'
import '../../styles/PlaybackPanel.css'

export default function PlaybackPanel({ 
    onPressStepForward, 
    onPressStepBackward, 
    onPressAutostepPlay, 
    onPressAutostepPause 
}) {
    return (
        <div id="playbackPanel" className="container">
            <p className="debugMarker"> Playback Pane </p>
            {/* Playback Buttons */}
            <button
                onClick={() => onPressStepForward("Step Forward")}
            >
                Step Forward
            </button>
            <button
                onClick={() => onPressStepBackward("Step Backward")}
            >
                Step Backward
            </button>
            <button
                onClick={() => onPressAutostepPlay("Autostep Play")}
            >
                Autostep Play
            </button>
            <button
                onClick={() => onPressAutostepPause("Autostep Pause")}
            >
                Autostep Pause
            </button>
        </div>
    );
}