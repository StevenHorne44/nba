import "./App.css";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { callEspn } from "./callEspn";
import type { Team, Player } from "./types";
import TeamList from "./TeamList";
import TeamRoster from "./TeamRoster";
import { getRoster } from "./getRoster";
import { getPlayerStats } from "./getPlayerStats";

interface PlayerSelectorProps {
    selectedPlayers: (Player | null)[];
    setSelectedPlayers: React.Dispatch<React.SetStateAction<(Player | null)[]>>;
}

export default function PlayerSelector({ selectedPlayers, setSelectedPlayers }: PlayerSelectorProps) {
    const [search, setSearch] = useState("");
    const [teamNames, setTeamNames] = useState<Team[]>([]);
    const [playerDetails, setPlayerDetails] = useState<Player[]>([]);
    const [selectedTeamAbbre, setSelectedTeamAbbre] = useState("");

    useEffect(() => {
        async function fetchTeams() {
            const teams = await callEspn();
            setTeamNames(teams);
        }
        fetchTeams();
    }, []);

    useEffect(() => {
    if (!selectedTeamAbbre) return;
    async function fetchRoster() {
        const roster = await getRoster(selectedTeamAbbre);
        const enriched = await Promise.all(
            roster.map(async (p) => {
                const stats = await getPlayerStats(p.id);
                return { ...p, ...stats };
            })
        );
        setPlayerDetails(enriched);
    }
    fetchRoster();
}, [selectedTeamAbbre]);

    function handleAddPlayer(player: Player) {
        const emptyIndex = selectedPlayers.findIndex((p) => p === null);
        if (emptyIndex === -1) return;
        const newSelected = [...selectedPlayers];
        newSelected[emptyIndex] = player;
        setSelectedPlayers(newSelected);
    }

    return (
        <div className="player-selector">
            <h3 className="player-selector-header">Player Selector </h3>
            <div className="player-selector-filter">
                <SearchBar search={search} setSearch={setSearch} />
                <h4>NBA Teams</h4>
                <TeamList
                    teamNames={teamNames}
                    search={search}
                    getRoster={(abbre) => setSelectedTeamAbbre(abbre)}
                />

            </div>
            <div className="player-selector-select">
                <div>
                    {playerDetails.length > 0 && (
                        <div>
                            <TeamRoster
                                playerDetails={playerDetails.map((p) => ({
                                    ...p,
                                    isPlayerSelected: selectedPlayers.some((sp) => sp?.fullname === p.fullname),
                                }))}
                                /// for each we set isPlayerSelected if in selectedPlayers.
                                onAddPlayer={handleAddPlayer}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
