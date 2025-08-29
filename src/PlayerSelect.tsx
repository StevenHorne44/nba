import './App.css'
import type { Player } from './types'
import blankPerson from './blank-person.png'


interface PlayerSelectProps {
    player: Player | null;
    onDelete?: () => void;
}


export function PlayerSelect({ player, onDelete }: PlayerSelectProps){

    if (!player) {
    return (
      <div className='player-profile-empty'>
        <img 
        src={blankPerson}
        />
        <h5>Empty Slot</h5>
      </div>
    );
  }

  return (
    <div className='player-profile'>
      {player.faceimg ? (
        <img
          src={player.faceimg}
          alt={player.fullname}
        />
      ): (
        <img 
          src={blankPerson}
        />

      )}
      <ul className='player-details'>
        <li> {player.fullname}</li>
        <li> {player.height}</li>
        <li> {player.weight}</li>
        
      </ul>
      <button onClick={onDelete}> Delete</button>
      
      
    </div>
    )

}