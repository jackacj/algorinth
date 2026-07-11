import { useState } from 'react'
import ContentPanel from '../ContentPanel/ContentPanel';
import TitlePanel from '../TitlePanel/TitlePanel';
import './App.css'

export default function App() {
  return (
    <div className="app">
      <TitlePanel />
      <ContentPanel />
    </div>
  );
}