import { useState } from 'react'
import './PlaybackPanel.css'

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep, faForwardFast, faBackwardFast, faPause, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons'

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
            <button className="playbackButton pushableButton"
                onClick={() => onPressPlayback("STEP_FORWARD")}
                disabled={playback.isAuto}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faForwardStep} />
                </span>
            </button>
            {/* Step Backward Button -> Disabled when Autoplaying */}
            <button className="playbackButton pushableButton"
                onClick={() => onPressPlayback("STEP_BACKWARD")}
                disabled={playback.isAuto}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faBackwardStep} />
                </span>
            </button>
            {/* Autostep Forward -> Replaced w/ Speed Controller when Autoplaying Forward */}
            {playback.isAuto && playback.isAutoForward && (speedController)}
            {(!playback.isAuto || !playback.isAutoForward) && (
                <button class="playbackButton pushableButton"
                    onClick={() => onPressPlayback("AUTOSTEP_PLAY_FORWARD")}
                >
                    <span className="playbackButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faForwardFast} />
                    </span>
                </button>
            )}
            {/* Autostep Backward -> Replaced w/ Speed Controller when Autoplaying Backward */}
            {playback.isAuto && !playback.isAutoForward && (speedController)}
            {(!playback.isAuto || playback.isAutoForward) && (
                <button class="playbackButton pushableButton"
                    onClick={() => onPressPlayback("AUTOSTEP_PLAY_BACKWARD")}
                >
                    <span className="playbackButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faBackwardFast} />
                   </span>
                </button>
            )}
            {/* Autostep Pause -> Disabled when Not Autoplaying */}
            <button class="playbackButton pushableButton"
                disabled={!playback.isAuto}
                onClick={() => onPressPlayback("AUTOSTEP_PAUSE")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faPause} />
                </span>
            </button>
            {/* Jump to Start */}
            <button class="playbackButton pushableButton"
                disabled={playback.isAuto}
                onClick={() => onPressPlayback("JUMP_START")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faHourglassStart} />
                </span>
            </button>
            {/* Jump to End */}
            <button class="playbackButton pushableButton"
                disabled={playback.isAuto}
                onClick={() => onPressPlayback("JUMP_END")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faHourglassEnd} />
                </span>
            </button>
            {/* Step Counter */}
            <div id="stepCounter" className="panel">
                {playback.currentStep + " / " + (playback.steps.length - 1)}
            </div>
        </div>
    );
}