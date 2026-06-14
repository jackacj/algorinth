import { useState } from 'react'
import '../../styles/PlaybackPanel.css'

export default function PlaybackPanel({ onPressPlayback }) {
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
                onClick={() => onPressPlayback("AUTOSTEP PLAY")}
            >
                Autostep Play
            </button>
            <button
                onClick={() => onPressPlayback("AUTOSTEP PAUSE")}
            >
                Autostep Pause
            </button>
        </div>
    );
}