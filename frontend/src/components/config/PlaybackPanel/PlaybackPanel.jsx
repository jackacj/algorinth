import { useState } from 'react'
import './PlaybackPanel.css'

// Icon Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForwardStep, faBackwardStep, faForwardFast, faBackwardFast, faPause, faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons'

export default function PlaybackPanel({ playback, onPressPlayback, onSpeedChange, playClick }) {
    
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

    // Handle Button Press
    function handleButtonPress(localCmd) {
        // Play 'Click' Audio
        playClick();

        // Inverse Data Flow
        onPressPlayback(localCmd);
    }

    return (
        <div id="playbackPanel" className="panel">
            {/* Playback Buttons */}
            {/* Step Forward Button -> Disabled when Autoplaying */}
            <button className="playbackButton pushableButton"
                onClick={() => handleButtonPress("STEP_FORWARD")}
                disabled={playback.isAuto}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faForwardStep} />
                </span>
                <p className="tooltip">
                    Step Forward
                </p>
            </button>
            {/* Step Backward Button -> Disabled when Autoplaying */}
            <button className="playbackButton pushableButton"
                onClick={() => handleButtonPress("STEP_BACKWARD")}
                disabled={playback.isAuto}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faBackwardStep} />
                </span>
                <p className="tooltip">
                    Step Back
                </p>
            </button>
            {/* Autostep Forward -> Replaced w/ Speed Controller when Autoplaying Forward */}
            {playback.isAuto && playback.isAutoForward && (speedController)}
            {(!playback.isAuto || !playback.isAutoForward) && (
                <button className="playbackButton pushableButton"
                    onClick={() => handleButtonPress("AUTOSTEP_PLAY_FORWARD")}
                >
                    <span className="playbackButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faForwardFast} />
                    </span>
                    <p className="tooltip">
                        Auto Forward
                    </p>
                </button>
            )}
            {/* Autostep Backward -> Replaced w/ Speed Controller when Autoplaying Backward */}
            {playback.isAuto && !playback.isAutoForward && (speedController)}
            {(!playback.isAuto || playback.isAutoForward) && (
                <button className="playbackButton pushableButton"
                    onClick={() => handleButtonPress("AUTOSTEP_PLAY_BACKWARD")}
                >
                    <span className="playbackButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faBackwardFast} />
                    </span>
                    <p className="tooltip">
                        Auto Backward
                    </p>
                </button>
            )}
            {/* Autostep Pause -> Disabled when Not Autoplaying */}
            <button className="playbackButton pushableButton"
                disabled={!playback.isAuto}
                onClick={() => handleButtonPress("AUTOSTEP_PAUSE")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faPause} />
                </span>
                <p className="tooltip">
                    Pause
                </p>
            </button>
            {/* Jump to Start */}
            <button className="playbackButton pushableButton"
                disabled={playback.isAuto}
                onClick={() => handleButtonPress("JUMP_START")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faHourglassStart} />
                </span>
                <p className="tooltip">
                    Start
                </p>
            </button>
            {/* Jump to End */}
            <button className="playbackButton pushableButton"
                disabled={playback.isAuto}
                onClick={() => handleButtonPress("JUMP_END")}
            >
                <span className="playbackButtonFront pushableButtonFront">
                    <FontAwesomeIcon icon={faHourglassEnd} />
                </span>
                <p className="tooltip">
                    End
                </p>
            </button>
            {/* Step Counter */}
            <div id="stepCounter" className="panel">
                {playback.currentStep + " / " + (playback.steps.length - 1)}
            </div>
        </div>
    );
}