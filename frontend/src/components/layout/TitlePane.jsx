import { useState } from 'react'
import '../../styles/TitlePane.css'

export default function TitlePane(){
    return (
        <div id="titlePane" className="container">
            <p className="debugMarker"> Title Pane </p>
            <h1> Untitled Maze Generation Project </h1>
        </div>
    );
}