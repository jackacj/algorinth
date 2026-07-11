import { useState } from 'react'
import GridCanvas from '../maze/GridCanvas';
import TitlePanel from './TitlePanel';
import '../../styles/App.css'

export default function App() {
  return (
    <div>
      <TitlePanel />
      <GridCanvas />
    </div>
  );
}