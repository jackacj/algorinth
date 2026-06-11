import { useState } from 'react'
import MainPane from './MainPane';
import TitlePane from './TitlePane';
import '../../styles/App.css'

export default function App() {
  return (
    <div>
      <TitlePane />
      <MainPane />
    </div>
  );
}