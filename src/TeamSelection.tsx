import "./App.css";
import { PlayerSelect } from "./PlayerSelect";
import type { Player, MadeTeam } from "./types";
import { getAllTeams, createTeam, updateTeam, deleteTeam } from "./getAllTeams";
import { useState, useEffect } from "react";
import TeamTotals from "./TeamTotals";

interface TeamSelectionProps {
  selectedPlayers: (Player | null)[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<(Player | null)[]>>;
  removePlayer: (index: number) => void;
}

export default function TeamSelection({selectedPlayers, setSelectedPlayers, removePlayer,}: TeamSelectionProps) {
  
  const [teams, setTeams] = useState<MadeTeam[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null)
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
  const [newTeam, setNewTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");




  useEffect(() => {
    fetchTeamNames();
  }, []);

  const fetchTeamNames = async () => {
    try {
      setloading(true);
      const data = await getAllTeams();
      setTeams(data || []);
      setError(null)
    } catch (err) {
      console.log(err) 
      setTeams([])
    } finally {
      setloading(false)
    }
  }


  const handleTeamChange = (teamName: string) => {
    setSelectedTeamName(teamName);

    const team = teams.find((t) => t.TeamName === teamName);

    if (team) {
      setSelectedTeamId(team.Id || null)
      const players: (Player | null)[] = [...team.Players];
      while (players.length < 5) players.push(null);
      setSelectedPlayers(players);
    } else {
      setSelectedTeamId(null)
      setSelectedPlayers([null, null, null, null, null]);
    }
  };

  const handleCancelNewTeam = () => {
    setNewTeam(false);
    setSelectedTeamName("");
    setNewTeamName("");
    setSelectedPlayers([null, null, null, null, null]);
  };
  
  const handleNew = () => {
    setSelectedPlayers([null, null, null, null, null])
    setNewTeam(true)
    setSelectedTeamId(null)
    setSelectedTeamName("");
    setNewTeamName("");
  };


  const handleAddTeam = async () => {
    if (!newTeamName) return;
    try {
      await createTeam({ TeamName: newTeamName, Players: selectedPlayers as Player[] });
      await fetchTeamNames();
      handleCancelNewTeam();
    } catch (err) {
      console.log(err)
      setError("Failed to create team")
    }
  };

   const handleSaveTeam = async () => {
    if (!selectedTeamId) return;
    try {
      await updateTeam(selectedTeamId, { TeamName: selectedTeamName, Players: selectedPlayers as Player[] });
      await fetchTeamNames();
    } catch (err) {
      console.error(err);
      setError("Failed to update team");
    }
  };

  const handleDeleteTeam = async () => {
    if (!selectedTeamId) return;
    try {
      await deleteTeam(selectedTeamId);
      setSelectedTeamId(null);
      setSelectedTeamName("");
      setSelectedPlayers([null, null, null, null, null]);
      await fetchTeamNames();
    } catch (err) {
      console.error(err);
      setError("Failed to delete team");
    }
  };

  if (loading) return <p>Loading teams...</p>;
  //if (error) return <p>{error}</p>;



  return (
    <div className="team-selection">
      <div>
        <select
          disabled={newTeam}
          value={selectedTeamName}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value="" disabled>
            --- Select a team ---
          </option>
          {teams.map((team) => (
            <option key={team.Id} value={team.TeamName}>
              {team.TeamName}
            </option>
          ))}
        </select>
        <button onClick={handleNew} disabled={newTeam}>
          New
        </button>
      </div>


      <h3 style={{ textAlign: "center" }}>
        Team Name:{" "}
        <input
          value={newTeam ? newTeamName : selectedTeamName}
          onChange={(e) =>
            newTeam ? setNewTeamName(e.target.value) : setSelectedTeamName(e.target.value)
          }
        />
      </h3>


      <div className="team-select">
        {selectedPlayers.map((player, idx) => (
          <PlayerSelect key={idx} player={player} onDelete={() => removePlayer(idx)} />
        ))}


        <div>
          <TeamTotals selectedPlayers={selectedPlayers} />
          {newTeam ? (
            <div>
              <button onClick={handleCancelNewTeam}>CANCEL</button>
              <button disabled={!newTeamName} onClick={handleAddTeam}>ADD</button>
            </div>
          ) : (
            <div>
              <button onClick={handleDeleteTeam}>DELETE</button>
              <button disabled={!selectedTeamName} onClick={handleSaveTeam}>SAVE</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
