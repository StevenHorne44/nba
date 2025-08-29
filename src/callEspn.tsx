export async function callEspn() {
    try {
      const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams');
      const data = await response.json();
    // Extract team names
      const teams = data.sports?.[0]?.leagues?.[0]?.teams?.map((teamObj: any) => ({
        name: teamObj.team.displayName,
        logo: teamObj.team.logos?.[0]?.href,
        abbre: teamObj.team.abbreviation,
      })) || [];
      return teams
  } catch (error) {
    console.error('Error fetching NBA teams:', error);
    return [];
  }
}
