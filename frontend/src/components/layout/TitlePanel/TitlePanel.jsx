import { useState } from 'react'
import './TitlePanel.css'

// Import Custom Audio Hook
import { useWithSound } from '../../../hooks/useWithSound'

// Icon & Audio Imports
import logo from "../../../assets/logo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolume, faVolumeXmark, faBoltLightning, faEye } from '@fortawesome/free-solid-svg-icons'
import click from '../../../assets/click.wav'

export default function TitlePanel({ isMute, isInstant, playClick, toggleAudio, toggleMode }){
    // Handle Pressing the Audio Toggle
    function handleAudioToggle() {
        // Toggle Mute
        toggleAudio();

        // Play 'Click' Noise
        playClick();
    }

    // Handle Pressing the Mode Toggle
    function handleModeToggle() {
        // Toggle Mute
        toggleMode();

        // Play 'Click' Noise
        playClick();
    }

    return (
        <div className="panel" id="titlePanel">
            {/* Central Elements */}
            <img id="logo" src={logo} />
            <div id="titleText">
                Algorinth.
            </div>
            {/* Toggle Audio Button */}
            <button className="titleButton audioButton pushableButton"
                onClick={() => handleAudioToggle()}
            >
                {isMute && (
                    <span className="titleButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faVolumeXmark} size="lg"/>
                    </span>
                )}
                {!isMute && (
                    <span className="titleButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faVolume} size="lg"/>
                    </span>
                )}
                <p className="tooltip titleTooltip">
                    Toggle Audio
                </p>
            </button>
            {/* Toggle Mode Button */}
            <button className="titleButton modeButton pushableButton"
                onClick={() => handleModeToggle()}
            >
                {isInstant && (
                    <span className="titleButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faBoltLightning} size="lg"/>
                    </span>
                )}
                {!isInstant && (
                    <span className="titleButtonFront pushableButtonFront">
                        <FontAwesomeIcon icon={faEye} size="lg"/>
                    </span>
                )}
                <p className="tooltip titleTooltip">
                    Toggle Mode
                </p>
            </button>
            {/* Mode Text */}
            <div id="modeText">{isInstant ? "Instant Mode" : "Visualise Mode"}</div>
        </div>
    );
}