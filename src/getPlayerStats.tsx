export async function getPlayerStats(athleteId: string) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/player-stats/${athleteId}`);
    const data = await response.json();

    const averagesCategory = data.categories?.find((c: any) => c.name === "averages");
    if (!averagesCategory) return { ppg: 0, rpg: 0, apg: 0 };

    const names: string[] = averagesCategory.names;
    const seasons = averagesCategory.statistics;
    if (!seasons?.length) return { ppg: 0, rpg: 0, apg: 0 };

    // Most recent season is the last entry in the array
    const latestSeason = seasons[seasons.length - 1];
    const stats: string[] = latestSeason.stats;

    const getStat = (statName: string) => {
      const index = names.indexOf(statName);
      return index === -1 ? 0 : parseFloat(stats[index]) || 0;
    };

    return {
      ppg: getStat("avgPoints"),
      rpg: getStat("avgRebounds"),
      apg: getStat("avgAssists"),
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return { ppg: 0, rpg: 0, apg: 0 };
  }
}