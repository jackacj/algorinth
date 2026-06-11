import { useState } from 'react'
import '../../styles/GridCanvas.css'
import Grid from './Grid';

export default function GridCanvas(){
    return (
        <div id="gridCanvas" className="container">
            <p className="debugMarker"> Grid Canvas </p>
            <Grid rows={10} cols={10}/>
            <div className="container">
                <p className="debugMarker"> Playback Pane </p>
            </div>
        </div>
    );
}