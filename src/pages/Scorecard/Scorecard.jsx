import { useSelector } from "react-redux";
import "./Scorecard.css";
import { useState } from "react";

export const Scorecard = ({ currentBattingTeam, currentBowlingTeam }) => {
  const [selectedTeam, setSelectedTeam] = useState(currentBattingTeam);

  return (
    <div id="matchScorecard">
      <div className="scorecardHeader">
        <h2 className="matchTitle">
          {currentBattingTeam.name}
          <span className="vsText"> VS </span>
          {currentBowlingTeam.name}
        </h2>
      </div>
      <div className="teamButtons">
        <button
          onClick={() => {
            setSelectedTeam(currentBattingTeam);
          }}
        >
          {currentBattingTeam.name}
        </button>
        <button
          onClick={() => {
            setSelectedTeam(currentBowlingTeam);
          }}
        >
          {currentBowlingTeam.name}
        </button>
      </div>

      <div className="scorecardContent">
        <div className="inningsCard">
          <h3 className="sectionTitle">Batting</h3>

          <div className="tableHeader">
            <span className="playerCol">Player</span>
            <span>R</span>
            <span>B</span>
            <span>4s</span>
            <span>6s</span>
            <span>SR</span>
          </div>

          {selectedTeam.players.map((player) => (
            <div className="tableRow" key={player.name}>
              <span className="playerCol">{player.name}</span>
              <span>{player.batting.runs}</span>
              <span>{player.batting.balls}</span>
              <span>{player.batting.fours}</span>
              <span>{player.batting.sixes}</span>
              <span>{player.batting.strikeRate}</span>
            </div>
          ))}
        </div>

        <div className="inningsCard">
          <h3 className="sectionTitle">Bowling</h3>

          <div className="tableHeader">
            <span className="playerCol">Player</span>
            <span>O</span>
            <span>R</span>
            <span>W</span>
            <span>Econ</span>
          </div>

          {selectedTeam.players.map((player) => (
            <div className="tableRow" key={player.name}>
              <span className="playerCol">{player.name}</span>
              <span>{player.bowling.overs}</span>
              <span>{player.bowling.runs}</span>
              <span>{player.bowling.wickets}</span>
              <span>{player.bowling.economy}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
