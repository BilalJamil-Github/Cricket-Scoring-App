import "./StartMyInnings.css";
import { useState } from "react";

const StartMyInnings = ({
  battingTeam,
  bowlingTeam,
  handleStartInnings,
  mode,
}) => {
  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");

  const start = () => {
    if (!striker || !nonStriker || !bowler) {
      alert("Please select all players.");
      return;
    }

    if (striker === nonStriker) {
      alert("Striker and Non-Striker cannot be same.");
      return;
    }

    handleStartInnings({
      striker,
      nonStriker,
      bowler,
    });
  };

  return (
    <div className="start_innings">
      <h2>Start Innings</h2>

      <div className="field">
        <label>Current Bowler</label>

        <select value={bowler} onChange={(e) => setBowler(e.target.value)}>
          <option value="">Select Bowler</option>

          {bowlingTeam?.players?.map((player, index) => (
            <option key={index} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Striker</label>

        <select value={striker} onChange={(e) => setStriker(e.target.value)}>
          <option value="">Select Striker</option>

          {battingTeam?.players?.map((player, index) => (
            <option key={index} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Non-Striker</label>

        <select
          value={nonStriker}
          onChange={(e) => setNonStriker(e.target.value)}
        >
          <option value="">Select Non-Striker</option>

          {battingTeam?.players?.map((player, index) => (
            <option
              key={index}
              value={player.name}
              disabled={player.name == striker}
            >
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={start}>Start Innings</button>
    </div>
  );
};

export default StartMyInnings;
