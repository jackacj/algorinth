import { useState } from 'react'
import '../../styles/TitlePanel.css'

export default function TitlePane(){
    return (
        <div id="titlePanel" className="container">
            <p className="debugMarker"> Title Pane </p>
            <h1> Algorinth </h1>
            <h3> by Jack Hartley, 2026</h3>
        </div>
    );
}