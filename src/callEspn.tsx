export async function callEspn() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/espn-teams/');
    const data = await response.json();
    console.log('ESPN raw response:', data);   // <-- add this

    const teams = data.sports?.[0]?.leagues?.[0]?.teams?.map((teamObj: any) => ({
      name: teamObj.team.displayName,
      logo: teamObj.team.logos?.[0]?.href,
      abbre: teamObj.team.abbreviation,
    })) || [];

    console.log('Mapped teams:', teams);        // <-- and this
    return teams;
  } catch (error) {
    console.error('Error fetching NBA teams:', error);
    return [];
  }
}