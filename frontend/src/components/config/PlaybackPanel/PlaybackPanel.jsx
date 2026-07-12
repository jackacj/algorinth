import { useState } from 'react'
import './PlaybackPanel.css'

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep, faForwardFast, faBackwardFast, faPause } from '@fortawesome/free-solid-svg-icons'

export default function PlaybackPanel({ playback, onPressPlayback, onSpeedChange }) {
    // Speed Controller HTML
    const speedController = (
        <div id="speedController" className="buttonStyle">
            <p id="speedControllerCounter"> {playback.stepsPerSecond + "/sec"} </p>
            <input
                id = "speedControllerRange"
                type="range"
                min="1"
                max="50"
                step="1"
                value={playback.stepsPerSecond}
                onChange={handleSpeedChange}
            />
        </div>  
    );

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
            {/* Step Forward Button -> Disabled when Autoplaying */}
            <button class="playbackButton"
                onClick={() => onPressPlayback("STEP_FORWARD")}
                disabled={playback.isAuto}
            >
                <FontAwesomeIcon icon={faForwardStep} />
            </button>
            {/* Step Backward Button -> Disabled when Autoplaying */}
            <button class="playbackButton"
                onClick={() => onPressPlayback("STEP_BACKWARD")}
                disabled={playback.isAuto}
            >
                <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            {/* Autostep Forward -> Replaced w/ Speed Controller when Autoplaying Forward */}
            {playback.isAuto && playback.isAutoForward && (speedController)}
            {(!playback.isAuto || !playback.isAutoForward) && (
                <button class="playbackButton"
                    onClick={() => onPressPlayback("AUTOSTEP_PLAY_FORWARD")}
                >
                    <FontAwesomeIcon icon={faForwardFast} />
                </button>
            )}
            {/* Autostep Backward -> Replaced w/ Speed Controller when Autoplaying Backward */}
            {playback.isAuto && !playback.isAutoForward && (speedController)}
            {(!playback.isAuto || playback.isAutoForward) && (
                <button class="playbackButton"
                    onClick={() => onPressPlayback("AUTOSTEP_PLAY_BACKWARD")}
                >
                    <FontAwesomeIcon icon={faBackwardFast} />
                </button>
            )}
            <button class="playbackButton"
                disabled={!playback.isAuto}
                onClick={() => onPressPlayback("AUTOSTEP_PAUSE")}
            >
                <FontAwesomeIcon icon={faPause} />
            </button>
            {/* Step Counter */}
            <div id="stepCounter" className="panel">
                {playback.currentStep + " / " + (playback.steps.length - 1)}
            </div>
        </div>
    );
}