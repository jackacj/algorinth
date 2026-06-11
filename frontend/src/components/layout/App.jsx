import { useState } from 'react'
import GridCanvas from '../maze/GridCanvas';
import TitlePane from './TitlePane';
import '../../styles/App.css'

export default function App() {
  return (
    <div>
      <TitlePane />
      <GridCanvas />
    </div>
  );
}