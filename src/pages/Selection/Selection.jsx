import { useState } from "react";
import "./Selection.css";

const Selection = ({ mode, players, onSelect, lastBowler }) => {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handleContinue = () => {
    if (!selectedPlayer) {
      return;
    }
    onSelect(selectedPlayer);
  };

  const filteredPlayers =
    mode === "bowler"
      ? players.filter(
          (player) =>
            player.name !== lastBowler &&
            player.batting?.status !== "Currently Batting",
        )
      : players.filter((player) => player.batting?.status === "Yet to Bat");

  return (
    <div className="selection">
      <div className="selection-card">
        <h2>
          {mode === "bowler" ? "Select New Bowler" : "Select New Batsman"}
        </h2>

        <p>
          {mode === "bowler"
            ? "Choose the bowler for the next over."
            : "Choose the next batsman to continue the innings."}
        </p>

        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">
            {mode === "bowler" ? "Select Bowler" : "Select Batsman"}
          </option>

          {filteredPlayers.map((player, index) => (
            <option key={index} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>

        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default Selection;
