import { current } from "@reduxjs/toolkit";

export const isInningEnd = (context) => {
  const { score, state, currentbattingteam } = context;

  const maxWickets = state.teams[currentbattingteam].players.length - 1;


  return score.overs === state.overs || score.wickets === maxWickets;
};
