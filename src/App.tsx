
import './App.css'
import Title from './Title.tsx'
import Footer from './Footer.tsx';
import TeamSelection from './TeamSelection.tsx';
import PlayerSelector from './PlayerSelector.tsx';
import type { Player } from './types.tsx';
import { useState } from 'react';

export default function App() {
  
  const [selectedPlayers, setSelectedPlayers] = useState<(Player | null)[]>([
    null, null, null, null, null
  ]);

  const removePlayer = (index: number) => {

    const updated = [...selectedPlayers];
    updated[index] = null;
    setSelectedPlayers(updated)
  }

  


  return (
    <>
      <div className='container' >
        <Title />
        <TeamSelection selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} removePlayer={removePlayer}/> 
        <PlayerSelector selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers}/>
        <Footer/>

      </div>
    </>
  )
}

