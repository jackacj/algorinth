import { useState } from 'react'
import '../../styles/MainPane.css'
import Grid from '../maze/Grid';
import GridCanvas from '../maze/GridCanvas';

export default function MainPain(){
    return (
        <div id="mainPane" className="container">
            <p className="debugMarker"> Main Pane </p>
            <GridCanvas />
            <div className="container">
                <p className="debugMarker"> Config Pane </p>
            </div>
        </div>
    );
}