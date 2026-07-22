import { useState } from 'react'
import './TitlePanel.css'

// Import Custom Audio Hook
import { useWithSound } from '../../../hooks/useWithSound'

// Icon & Audio Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import click from '../../../assets/click.wav'

export default function TitlePanel({ isMute, playClick, toggleAudio }){
    // Handle Pressing the Audio Toggle
    function handleAudioToggle() {
        // Toggle Mute
        toggleAudio();

        // Play 'Click' Noise
        playClick();
    }

    return (
        <div className="panel" id="titlePanel">
            <div id="titleText">
                Algorinth.
            </div>
            <button className="audioButton pushableButton"
                onClick={() => handleAudioToggle()}
            >
                {isMute && (
                    <span className="audioButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faVolumeXmark} size="lg"/>
                    </span>
                )}
                {!isMute && (
                    <span className="audioButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faVolume} size="lg"/>
                    </span>
                )}
            </button>
        </div>
    );
}