import { useState } from 'react'
import './App.css'

export default function App() {
  return (
    <div class="container">
      <p class="debugMarker"> Title Pane </p>
      <h1> Untitled Maze Generation Project </h1>
      <div class="container">
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
    </div>
  );
}