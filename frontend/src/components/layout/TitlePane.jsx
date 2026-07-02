import { useState } from 'react'
import '../../styles/TitlePane.css'

export default function TitlePane(){
    return (
        <div id="titlePane" className="container">
            <p className="debugMarker"> Title Pane </p>
            <h1> Algorinth </h1>
            <h3> by Jack Hartley, 2026</h3>
        </div>
    );
}