export const addBallHistory = (context) => {
  const {
    inning,
    score,
    batRuns,
    extra,
    wicket,
    legalBall,
    extraRuns,
    totalRuns,
  } = context;

  inning.balls.push({
    over: score.overs,
    ball: score.balls,

    batsman: inning.striker,
    bowler: inning.bowler,

    striker: inning.striker,
    nonStriker: inning.nonStriker,

    legalBall,
    batRuns,

    extra: extra
      ? {
          type: extra.type,
          runs: extraRuns,
        }
      : {
          type: null,
          runs: 0,
        },

    totalRuns,

    wicket: wicket?.isWicket
      ? {
          isWicket: true,
          type: wicket.type ?? null,
          playerOut: wicket.playerOut ?? inning.striker,
        }
      : {
          isWicket: false,
          type: null,
          playerOut: null,
        },
  });
};
