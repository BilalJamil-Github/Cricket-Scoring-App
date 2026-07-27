import { current } from "@reduxjs/toolkit";
import { RotateStrike } from "./RotateStrike";

export const eachPlayerScore = (context) => {
  const {
    inning,
    batRuns,
    wicket,
    legalBall,
    isNoBall,
    isLegBye,
    teams,
    currentbattingteam,
    currentbowlingteam,
    isWide,
    extraRuns,
  } = context;

  const score = inning.score;

  const battingTeams = teams[currentbattingteam];
  const bowlingTeams = teams[currentbowlingteam];

  const battingPlayers = battingTeams ? battingTeams.players : [];
  const bowlingPlayers = bowlingTeams ? bowlingTeams.players : [];

  let striker = battingPlayers.find((player) => player.name === inning.striker);

  let nonStriker = battingPlayers.find(
    (player) => player.name === inning.nonStriker,
  );

  if (striker) {
    striker.batting.status = "Currently Batting";
  }

  if (nonStriker) {
    nonStriker.batting.status = "Currently Batting";
  }

  let bowler = bowlingPlayers.find((player) => player.name === inning.bowler);

  if (striker) {
    if (!striker.batting) {
      striker.batting = {
        runs: 0,
        balls: 0,
        sixes: 0,
        fours: 0,
        strikeRate: 0,
        isOut: false,
        status: "Currently Batting",
      };
    }

    if (legalBall) {
      if (wicket?.isWicket) {
        striker.batting.isOut = true;
        striker.isOut = true;
        score.wickets += 1;
        striker.batting.status = "Out";
      }

      striker.batting.runs += batRuns;
      score.runs += batRuns;
      striker.batting.balls += 1;
      score.balls += 1;
      if (batRuns === 6) striker.batting.sixes += 1;
      if (batRuns === 4) striker.batting.fours += 1;
    } else {
      if (isNoBall) {
        striker.batting.runs += batRuns;
        striker.batting.balls += 1;
        score.runs += extraRuns;
        if (batRuns === 6) striker.batting.sixes += 1;
        if (batRuns === 4) striker.batting.fours += 1;
        if (batRuns % 2 === 1) {
          const rotated = RotateStrike(striker.name, nonStriker.name);
          inning.striker = rotated.striker;
          inning.nonStriker = rotated.nonStriker;
        }
      } else if (isLegBye) {
        striker.batting.balls += 1;
        score.runs += extraRuns;
        if (extraRuns % 2 === 1) {
          const rotated = RotateStrike(striker.name, nonStriker.name);
          inning.striker = rotated.striker;
          inning.nonStriker = rotated.nonStriker;
        }
      } else if (isWide) {
        score.runs += extraRuns;
        if ((extraRuns - 1) % 2 === 1) {
          const rotated = RotateStrike(striker.name, nonStriker.name);
          inning.striker = rotated.striker;
          inning.nonStriker = rotated.nonStriker;
        }
      }
    }

    striker.batting.strikeRate =
      striker.batting.balls > 0
        ? Math.floor(
            (striker.batting.runs / striker.batting.balls) * 100 * 100,
          ) / 100
        : 0;
  }

  if (bowler) {
    if (!bowler.bowling) {
      bowler.bowling = {
        overs: 0,
        balls: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        wides: 0,
        noBalls: 0,
        economy: 0,
      };
    }
    if (legalBall) {
      if (wicket?.isWicket) bowler.bowling.wickets += 1;
      bowler.bowling.balls++;
      bowler.bowling.runs += batRuns;
      if (bowler.bowling.balls === 6) {
        bowler.bowling.balls = 0;
        bowler.bowling.overs += 1;
      }
      const totalBallsBowled = bowler.bowling.overs * 6 + bowler.bowling.balls;
      bowler.bowling.economy =
        totalBallsBowled > 0 ? (bowler.bowling.runs / totalBallsBowled) * 6 : 0;
    } else {
      if (isNoBall) {
        bowler.bowling.noBalls += 1;
        bowler.bowling.runs += batRuns + extraRuns;
      } else if (isWide) {
        bowler.bowling.wides += 1;
        bowler.bowling.runs += extraRuns;
      }
    }
  }
};
