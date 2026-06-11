import { useState } from 'react'
import './MainPane.css'

export default function MainPain(){
    return (
        <div id="mainPane" class="container">
            <p class="debugMarker"> Main Pane </p>
            <div class="container">
                <p class="debugMarker"> Maze Pane </p>
                <div class="container">
                    <p class="debugMarker"> Playback Pane </p>
                </div>
            </div>
            <div class="container">
                <p class="debugMarker"> Config Pane </p>
            </div>
        </div>
    );
}