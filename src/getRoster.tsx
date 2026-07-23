import type { Player } from "./types";



export async function getRoster(abbre: string) {
    
    const apiteam = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${abbre}/roster`
    try {
      const response = await fetch(apiteam);
      const data = await response.json();
      // Extract Player details 
      const players : Player[] = data.athletes?.map((athlete: any) => ({
        id: athlete.id,
        fullname: athlete.displayName,
        faceimg: athlete.headshot?.href || "", 
        height: athlete.displayHeight || "",
        weight: athlete.displayWeight || "",
        jersey: athlete.jersey || "",
        position: athlete.position?.abbreviation || "",
        isPlayerSelected: false,
      })) || [];
      return players;
  } catch (error) {
    console.error('Error fetching NBA Roster', error);
    return [];
    }
  }
