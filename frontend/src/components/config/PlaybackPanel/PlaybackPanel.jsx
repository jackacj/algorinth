import { useState } from 'react'
import './PlaybackPanel.css'

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep, faForwardFast, faBackwardFast, faPause } from '@fortawesome/free-solid-svg-icons'

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
            <button class="playbackButton"
                onClick={() => onPressPlayback("STEP_FORWARD")}
                disabled={playback.isAuto}
            >
                <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <button class="playbackButton"
                onClick={() => onPressPlayback("STEP_BACKWARD")}
                disabled={playback.isAuto}
            >
                <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <button class="playbackButton"
                onClick={() => onPressPlayback("AUTOSTEP_PLAY_FORWARD")}
            >
                <FontAwesomeIcon icon={faForwardFast} />
            </button>
            <button class="playbackButton"
                onClick={() => onPressPlayback("AUTOSTEP_PLAY_BACKWARD")}
            >
                <FontAwesomeIcon icon={faBackwardFast} />
            </button>
            <button class="playbackButton"
                onClick={() => onPressPlayback("AUTOSTEP_PAUSE")}
            >
                <FontAwesomeIcon icon={faPause} />
            </button>
            {/* Step Counter - Very Rough */}
            <div id="stepCounter" className="panel">
                {playback.currentStep + " / " + (playback.steps.length - 1)}
            </div>
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