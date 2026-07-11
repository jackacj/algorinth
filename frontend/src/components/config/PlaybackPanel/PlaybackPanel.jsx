import { useState } from 'react'
import './PlaybackPanel.css'

export default function PlaybackPanel({ playback, onPressPlayback, onSpeedChange }) {
    // Handle Local Speed Change
    function handleSpeedChange(event) {
        // Unpack Event
        const { name, value } = event.target

        // Apply Change to Grid Canvas
        onSpeedChange(value);
    }

    return (
        <div id="playbackPanel" className="panel">
            {/* Playback Buttons */}
            {/* Step Forward & Backward Disabled when Autoplaying */}
            <button
                onClick={() => onPressPlayback("STEP_FORWARD")}
                disabled={playback.isAuto}
            >
                Step Forward
            </button>
            <button
                onClick={() => onPressPlayback("STEP_BACKWARD")}
                disabled={playback.isAuto}
            >
                Step Backward
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP_PLAY_FORWARD")}
            >
                Autostep Play Forward
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP_PLAY_BACKWARD")}
            >
                Autostep Play Backward
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP_PAUSE")}
            >
                Autostep Pause
            </button>
            {/* Step Counter - Very Rough */}
            <p> {"Steps: " + playback.currentStep + " / " + (playback.steps.length - 1)} </p>
            {/* Speed Controller - Rough & Conditionally Rendered */}
            {playback.isAuto && (
                <div>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={playback.stepsPerSecond}
                        onChange={handleSpeedChange}
                    />
                    <p> {"Speed: " + playback.stepsPerSecond + " Steps per Second"} </p>
                </div>  
            )}
        </div>
    );
}