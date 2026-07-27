import "./LiveScore.css";

const LiveScore = ({ score, balls }) => {
  let previousOver = -1;

  return (
    <div id="live_Score">
      {balls.map((ball, index) => {
        const showOver = ball.over !== previousOver;
        previousOver = ball.over;

        return (
          <div key={index} id="main">
            {showOver && <div className="over-heading">Over {ball.over}</div>}

            <div
              className={`each_score
      ${ball.wicket.isWicket ? "wicketball" : ""}
      ${ball.batRuns === 4 ? "fourball" : ""}
      ${ball.batRuns === 6 ? "sixball" : ""}`}
            >
              <span>
                {ball.wicket.isWicket
                  ? "W"
                  : ball.extra?.type
                    ? `${ball.extra.type} - ${ball.extra.runs}`
                    : ball.batRuns}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveScore;
