import type { Team } from './types';

interface TeamListProps {
  teamNames: Team[];
  search: string;
  getRoster: (abbre: string) => void;
  deleteTeam: (name: string) => void;


}


export default function TeamList({ teamNames, search, getRoster, deleteTeam }: TeamListProps) {

  return (

    <ul className='team-list'>
      {teamNames
        .filter((team) =>

          team.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((team) => (
          <li key={team.name}>
            <img
              src={team.logo}
              alt={team.name}
              style={{ width: 25, height: 25 }}
            />
            <button onClick={() => getRoster(team.abbre)}>
              {team.name} {team.abbre}</button>
            <button onClick={() => deleteTeam(team.name)}><span className="material-icons delete-button">delete</span> </button>
            <div ></div>

          </li>
        ))}
    </ul>
  )

}