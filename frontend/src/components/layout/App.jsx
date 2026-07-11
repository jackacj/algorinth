import { useState } from 'react'
import ContentPanel from './ContentPanel';
import TitlePanel from './TitlePanel';
import '../../styles/App.css'

export default function App() {
  return (
    <div>
      <TitlePanel />
      <ContentPanel />
    </div>
  );
}