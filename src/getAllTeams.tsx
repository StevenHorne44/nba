import type { MadeTeam } from "./types";




//Fetch TEAMS
export async function getAllTeams(): Promise<MadeTeam[]> {
    const res = await fetch("http://127.0.0.1:5000/api/teams/")
    if (!res.ok) throw new Error("Failed to fetch team");
    return res.json();
}


// Create team
export async function createTeam(team: MadeTeam): Promise<MadeTeam> {
    const res = await fetch("http://127.0.0.1:5000/api/teams/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TeamName: team.TeamName, Players: team.Players })
    });
    if (!res.ok) throw new Error("Failed to create team")
    return res.json();
}


// Update an existing team
export async function updateTeam(id: number, team: MadeTeam): Promise<MadeTeam> {
    const res = await fetch(`http://127.0.0.1:5000/api/teams/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TeamName: team.TeamName, Players: team.Players }),
    });
    if (!res.ok) throw new Error("Failed to update team");
    return res.json();
}

// Delete TEAM
export async function deleteTeam(id: number): Promise<void> {
    const res = await fetch(`http://127.0.0.1:5000/api/teams/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete team");
}


