import { useState } from 'react'
import '../../styles/MainPane.css'
import Grid from '../maze/Grid';

export default function MainPain(){
    return (
        <div id="mainPane" className="container">
            <p className="debugMarker"> Main Pane </p>
            <div className="container">
                <p className="debugMarker"> Maze Pane </p>
                <Grid rows={20} cols={20}/>
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