import type { Team } from './types';

interface TeamListProps {
  teamNames: Team[];
  search: string;
  getRoster: (abbre: string) => void;
}


export default function TeamList({ teamNames, search, getRoster }: TeamListProps) {

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
            <button className="team-button" onClick={() => getRoster(team.abbre)}>
              {team.name} {team.abbre}</button>
            <div ></div>

          </li>
        ))}
    </ul>
  )

}