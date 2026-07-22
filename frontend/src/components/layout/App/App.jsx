import { useState } from 'react'
import ContentPanel from '../ContentPanel/ContentPanel';
import TitlePanel from '../TitlePanel/TitlePanel';
import './App.css'

// Import Custom Audio Hook & Sound
import { useWithSound } from '../../../hooks/useWithSound'
import click from '../../../assets/click.wav'

export default function App() {
  // Audio State for Entire App
  const [isMute, setIsMute] = useState(false);
  // 'Click' Audio Hook
  const { playSound } = useWithSound(click);

  // 'Click' Audio Function to be Passed
  function playClick() {
    // Play 'Click' Sound when Unmuted
    if (!isMute) {
      playSound();
    }
  }

  // Toggle whether Audio is Muted
  function toggleAudio() {
    // Set as Inverse of Current
    setIsMute(!isMute);
  }

  return (
    <div className="app">
      <TitlePanel isMute={isMute} playClick={playClick} toggleAudio={toggleAudio}/>
      <ContentPanel playClick={playClick}/>
    </div>
  );
}