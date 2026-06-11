import { useState } from 'react'
import '../../styles/MainPane.css'

export default function MainPain(){
    return (
        <div id="mainPane" className="container">
            <p className="debugMarker"> Main Pane </p>
            <div className="container">
                <p className="debugMarker"> Maze Pane </p>
                <div className="container">
                    <p className="debugMarker"> Playback Pane </p>
                </div>
            </div>
            <div className="container">
                <p className="debugMarker"> Config Pane </p>
            </div>
        </div>
    );
}