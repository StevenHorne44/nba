import './App.css'
import { PlayerSelect } from './PlayerSelect'
import type { Player } from './types';

interface TeamSelectionProps {
  selectedPlayers: (Player | null)[];
  removePlayer: (index: number) => void;
}


export default function TeamSelection({selectedPlayers, removePlayer}: TeamSelectionProps) {

   

    return (
        <>
            <div className='team-selection'>

                <h3> Team Selection</h3>

                <div className='team-select'>
                    {selectedPlayers.map((player, idx) => (
                        <PlayerSelect key={idx} player={player} 
                        onDelete={() => removePlayer(idx)}/>
                    ))}

                </div>



            </div>



        </>

    )



}