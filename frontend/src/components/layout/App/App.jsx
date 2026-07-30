import { useState } from 'react'
import ContentPanel from '../ContentPanel/ContentPanel';
import TitlePanel from '../TitlePanel/TitlePanel';
import './App.css'

// Import Custom Audio Hook & Sound
import { useWithSound } from '../../../hooks/useWithSound'
import click from '../../../assets/click.wav'

export default function App() {
  // Audio & Mode State for Entire App
  const [isMute, setIsMute] = useState(false);
  const [isInstant, setIsInstant] = useState(false);
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

  // Toggle whether Mode is 'Instant' (True) or 'Visualise' (False)
  function toggleMode() {
    // Set as Inverse of Current
    setIsInstant(!isInstant);
  }

  return (
    <div className="app">
      <TitlePanel isMute={isMute} isInstant={isInstant} playClick={playClick} toggleAudio={toggleAudio} toggleMode={toggleMode} />
      <ContentPanel playClick={playClick} isInstant={isInstant} />
    </div>
  );
}