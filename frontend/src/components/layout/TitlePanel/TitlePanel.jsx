import { useState } from 'react'
import './TitlePanel.css'
import logo from '../../../assets/noun-maze.svg'

export default function TitlePane(){
    return (
        <div className="panel" id="titlePanel">
            <div id="titleText">
                Algorinth.
            </div>
        </div>
    );
}