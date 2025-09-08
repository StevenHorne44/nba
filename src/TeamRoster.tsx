import type { Player } from "./types";
import './App.css'
import blankPerson from './images/blank-person.png'

interface TeamRosterProps {
    playerDetails: Player[];
    onAddPlayer?: (player: Player) => void;
    
}


export default function TeamRoster({ playerDetails, onAddPlayer }: TeamRosterProps) {
  return (
    <div >
      <table className="team-roster" >
        <thead>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Jersey</th>
            <th>Position</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {playerDetails.map((player) => (
            <tr key={player.fullname} 
            draggable="true" 
            style={{backgroundColor: player.isPlayerSelected ? "black" : undefined, color: player.isPlayerSelected ? "white" : undefined}} >
              <td>
                {player.faceimg ? (
                  <img
                    src={player.faceimg}
                    alt={player.fullname}
                    className="player-icon"
                  />
                ): (
                  <img 
                    src={blankPerson}
                    className="player-icon"
                  />
                )}
              </td>
              <td>{player.fullname}</td>
              <td>{player.height || "-"}</td>
              <td>{player.weight || "-"}</td>
              <td>{player.jersey || "-"}</td>
              <td>{player.position || "-"}</td>
              <td>
                <button onClick={() => onAddPlayer?.(player)} disabled={player.isPlayerSelected}>{player.isPlayerSelected ? <span className="material-icons delete-button">done</span> : <span className="material-icons delete-button">add</span>}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


