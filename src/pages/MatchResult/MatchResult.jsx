import React from "react";
import "./MatchResult.css";

const MatchResult = ({ result }) => {
  return (
    <>
      <div className="result-card">
        <div className="trophy">🏆</div>

        <h1>Match Result</h1>

        <h2>{result.team} Won!</h2>

        <p>
          <strong>
            {result.wickets
              ? `${result.team} won by ${result.wickets} wickets`
              : `${result.team} won by ${result.runs} runs`}
          </strong>
        </p>
      </div>
    </>
  );
};

export default MatchResult;
