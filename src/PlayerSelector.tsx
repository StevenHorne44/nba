import './App.css'
import SearchBar from './searchBar'
import { useState, useEffect } from 'react'
import { callEspn } from './callEspn'
import type { Team, Player } from './types'
import TeamList from './TeamList'
import UndoDelete from './UndoDelete'
import TeamRoster from './TeamRoster'
import { getRoster } from './getRoster'

interface PlayerSelectorProps {
    selectedPlayers: (Player | null)[];
    setSelectedPlayers: React.Dispatch<React.SetStateAction<(Player | null)[]>>;
}

export default function PlayerSelector({ selectedPlayers, setSelectedPlayers }: PlayerSelectorProps) {
    const [search, setSearch] = useState('')
    const [canedit, setCanedit] = useState(false)
    const [teamNames, setTeamNames] = useState<Team[]>([]);
    const [deletedTeams, setDeletedTeams] = useState<Team[]>([]);
    const [playerDetails, setPlayerDetails] = useState<Player[]>([]);
    const [selectedTeamAbbre, setSelectedTeamAbbre] = useState('');

    useEffect(() => {

        async function fetchTeams() {
            const teams = await callEspn();
            setTeamNames(teams);
        }
        fetchTeams();
    }, []);


    useEffect(() => {
        async function fetchRoster() {
            const roster = await getRoster(selectedTeamAbbre);
            setPlayerDetails(roster);
        }
        fetchRoster();
    }, [selectedTeamAbbre]);


    function deleteTeam(name: string) {
        const teamToDelete = teamNames.find(t => t.name === name);
        if (!teamToDelete) return;
        setTeamNames(teamNames.filter(t => t.name !== name));
        setDeletedTeams([...deletedTeams, teamToDelete]);
    }

    function undoDelete() {
        if (deletedTeams.length === 0) return;
        const lastDeleted = deletedTeams[deletedTeams.length - 1];
        setDeletedTeams(deletedTeams.slice(0, -1));
        const newTeamNames = [...teamNames, lastDeleted].sort((a, b) =>
            a.name.localeCompare(b.name));
        setTeamNames(newTeamNames);
    }

    function handleAddPlayer(player: Player) {
        const emptyIndex = selectedPlayers.findIndex(p => p === null);
        if (emptyIndex === -1) return; 
        const newSelected = [...selectedPlayers];
        newSelected[emptyIndex] = player;
        setSelectedPlayers(newSelected);
    }



    return (

        <div className='player-selector'>
            <div className="side-filter">
                <h3>Player Selector </h3>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    canedit={canedit}
                    setCanedit={setCanedit}
                />

                <UndoDelete undoDelete={undoDelete} disabled={deletedTeams.length === 0}
                />

                <h4>NBA Teams</h4>

                <div>
                    
                    <TeamList
                        teamNames={teamNames}
                        search={search}
                        getRoster={(abbre) => setSelectedTeamAbbre(abbre)}
                        deleteTeam={deleteTeam}
                    />



                </div>
            </div>

            <div className='player-filter-select'>
                
                <div >
                    {playerDetails.length > 0 && (
                        <div >

                            <TeamRoster
                                playerDetails={playerDetails.map(p => ({
                                    ...p, isPlayerSelected: selectedPlayers.some(sp => sp?.fullname === p.fullname)
                                }))}

                                /// for each we set isPlayerSelected if in selectedPlayers. 
                                onAddPlayer={handleAddPlayer}
                            />
                        </div>
                    )}
                </div>

            </div>



        </div>
    )
}