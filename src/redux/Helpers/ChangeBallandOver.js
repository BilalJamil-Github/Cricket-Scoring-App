import { checkMaidenOver } from "./checkMaidenOver";
import { RotateStrike } from "./RotateStrike";
import { shouldRotateStrike } from "./shouldRotateStrike";

export const ChangeBallandOver = (context) => {
  const { inning, score, batRuns, extra, state } = context;

  let currentBalls = score.balls;
  let currentOvers = score.overs;
  const extraRuns = extra?.runs || 0;

  if (context.legalBall) {
    if (currentBalls === 6) {
      currentBalls = 0;
      currentOvers += 1;
      let concededRuns = batRuns;
      if (extra?.type === "wd" || extra?.type === "nb") {
        concededRuns += extraRuns;
      }

      score.currentOverRuns = (score.currentOverRuns || 0) + concededRuns;
      checkMaidenOver(context);

      const shouldRotate = shouldRotateStrike(batRuns, extra);
      if (!shouldRotate) {
        const updated = RotateStrike(inning.striker, inning.nonStriker);
        inning.striker = updated.striker;
        inning.nonStriker = updated.nonStriker;

        score.currentOverRuns = 0;
      }
    } else {
      let concededRuns = batRuns;

      if (extra?.type === "wd" || extra?.type === "nb") {
        concededRuns += extraRuns;
      }

      score.currentOverRuns = (score.currentOverRuns || 0) + concededRuns;

      const shouldRotate = shouldRotateStrike(batRuns, extra);
      if (shouldRotate) {
        const updated = RotateStrike(inning.striker, inning.nonStriker);
        inning.striker = updated.striker;
        inning.nonStriker = updated.nonStriker;
      }
    }
  }

  score.balls = currentBalls;
  score.overs = currentOvers;
};
