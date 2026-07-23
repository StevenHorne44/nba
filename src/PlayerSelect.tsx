import "./App.css";
import type { Player } from "./types";
import blankPerson from "./images/blank-person.png";


interface PlayerSelectProps {
  player: Player | null;
  onDelete?: () => void;
}

export function PlayerSelect({ player, onDelete }: PlayerSelectProps) {
  if (!player) {
    return (
      <div className="playerCard">
        <div className="playerName">Pick Team Member</div>

        <div className="playerHeader">
          <img className="playerHeadshot" src={blankPerson} />
          <div className="playerBasicInfo">
            <h4>#</h4>
          </div>
        </div>
        <div className="playerDetails">
          <div className="detailRow">
            <span className="detailLabel">Position:</span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Height:</span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Weight:</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="playerCard">
      <button onClick={onDelete} className="deleteButton"><span className="material-icons delete-button">delete</span></button>
      <div className="playerName">
        {player.fullname}
      </div>
      <div className="playerHeader">
        <img
          src={player.faceimg || blankPerson}
          alt={`${player.fullname} headshot`}
          className="playerHeadshot"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        <div className="playerBasicInfo">
          <h4>#{player.jersey}</h4>
        </div>
      </div>
      <div className="playerDetails">
        <div className="detailRow">
          <span className="detailLabel">Position:</span>
          <span className="detailValue">{player.position} </span>
        </div>
        <div className="detailRow">
          <span className="detailLabel">Height:</span>
          <span className="detailValue">{player.height}</span>
          <span className="detailLabel">Weight:</span>
          <span className="detailValue">{player.weight}</span>
        </div>
        
        <div className="detailRow">
          <span className="detailLabel">PPG:</span>
          <span className="detailValue">{player.ppg}</span>
          <span className="detailLabel">APG:</span>
          <span className="detailValue">{player.apg}</span>
          <span className="detailLabel">RPG:</span>
          <span className="detailValue">{player.rpg}</span>
        </div>
      </div>
    </div>
  );
}

// export function PlayerSelect({ player, onDelete }: PlayerSelectProps) {
//   if (!player) {
//     return (
//       <div className="player-profile-empty">
//         <img src={blankPerson} />
//         <h5>Empty Slot</h5>
//       </div>
//     );
//   }

//   return (
//     <div className="player-profile">
//       {player.faceimg ? <img src={player.faceimg} alt={player.fullname} /> : <img src={blankPerson} />}
//       <ul className="player-details">
//         <li> {player.fullname}</li>
//         <li> {player.height}</li>
//         <li> {player.weight}</li>
//       </ul>
//       <button onClick={onDelete}>
//         {" "}
//         <span className="material-icons delete-button">delete</span> Delete{" "}
//       </button>
//     </div>
//   );
// }
