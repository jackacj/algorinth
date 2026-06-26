import { useState } from 'react'
import '../../styles/PlaybackPanel.css'

export default function PlaybackPanel({ playback, onPressPlayback }) {
    return (
        <div id="playbackPanel" className="container">
            <p className="debugMarker"> Playback Pane </p>
            {/* Playback Buttons */}
            <button
                onClick={() => onPressPlayback("STEP_FORWARD")}
            >
                Step Forward
            </button>
            <button
                onClick={() => onPressPlayback("STEP_BACKWARD")}
            >
                Step Backward
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP_PLAY")}
            >
                Autostep Play
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP_PAUSE")}
            >
                Autostep Pause
            </button>
            {/* Step Counter - Very Rough */}
            <p> {"Steps: " + playback.currentStep + " / " + (playback.steps).length} </p>
        </div>
    );
}