export const checkMaidenOver = (context) => {
  const { score, bowler } = context;

  if (score.balls === 5) {
    if (score.currentOverRuns === 0) {
      bowler.bowling.maidens++;
    }

    score.currentOverRuns = 0;
  }
};
