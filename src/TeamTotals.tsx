import type { Player } from "./types";
import "./App.css";

interface TeamTotalsProps {
    selectedPlayers: (Player | null)[];
}

export default function TeamTotals({ selectedPlayers }: TeamTotalsProps) {
  const active = selectedPlayers.filter((p): p is Player => p !== null);

  const totals = active.reduce(
    (acc, p) => ({
      ppg: acc.ppg + (p.ppg ?? 0),
      rpg: acc.rpg + (p.rpg ?? 0),
      apg: acc.apg + (p.apg ?? 0),
    }),
    { ppg: 0, rpg: 0, apg: 0 }
  );

    return (    
        <div>
            <h4> Team Totals </h4>
            <p> PPG: {totals.ppg.toFixed(1)} </p>
            <p> RPG: {totals.rpg.toFixed(1)} </p>
            <p> APG: {totals.apg.toFixed(1)} </p>
        </div>
    );
}