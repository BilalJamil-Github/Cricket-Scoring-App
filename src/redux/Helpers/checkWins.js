// import { current } from "@reduxjs/toolkit";

// export const checkWins = (context) => {
//   const { state, currentbattingteam, currentbowlingteam } = context;
//   console.log("States from check WINS ", current(state));
//   const secondInnings = state.innings[1];

//   if (secondInnings.score.runs >= state.target) {
//     alert("Run Match Ended")
//     state.matchEnded = true;

//     state.winning = {
//       team: state.teams[currentbattingteam].teamName,
//       wickets:
//         state.teams[currentbattingteam].length - secondInnings.score.wickets,
//     };
//   } else if (
//     secondInnings.score.wickets ===
//       state.teams[currentbattingteam].totalPlayers - 1 &&
//     secondInnings.score.runs < state.target
//   ) {
//     state.matchEnded = true;

//     state.winning = {
//       team: state.teams[currentbowlingteam].teamName,
//       runs: state.target - secondInnings.score.runs,
//     };
//   }
// };

import { current } from "@reduxjs/toolkit";

export const checkWins = (context) => {
  const { state, currentbattingteam, currentbowlingteam } = context;
  const secondInnings = state.innings[1];


  if (state.innings[0].score.runs + 1 <= secondInnings.score.runs) {
    state.matchEnded = true;
    state.winning = {
      team: state.teams[currentbattingteam].name,
      wickets:
        state.teams[currentbattingteam].players.length -
        secondInnings.score.wickets,
    };
  }

  if (state.innings[0].score.runs + 1 > secondInnings.score.runs) {
    if (state.overs == secondInnings.score.overs) {
      state.matchEnded = true;
      state.winning = {
        team: state.teams[currentbowlingteam].name,
        runs: state.innings[0].score.runs + 1 - secondInnings.score.runs,
      };
    }
  }
};
