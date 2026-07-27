import { createSlice } from "@reduxjs/toolkit";
import { addBallHistory } from "./Helpers/AddBallHistroy.js";
import { ChangeBallandOver } from "./Helpers/ChangeballandOver.js";
import { current } from "@reduxjs/toolkit";
import { eachPlayerScore } from "./Helpers/eachPlayerScore.js";
import { isInningEnd } from "./Helpers/isInningEnd.js";
import { checkWins } from "./Helpers/checkWins.js";

// const initialState = {
//   id: 361079,
//   toss: {
//     winnerTeam: "Team 1",
//     decision: "BAT",
//   },
//   teams: [
//     {
//       name: "Team 1",
//       players: [
//         {
//           name: "Haris",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Yousuf",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Ahmed",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Ali",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Shan",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//       ],
//     },
//     {
//       name: "Team 2",
//       players: [
//         {
//           name: "Bilal",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Umer",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Asad",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Hamza",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//         {
//           name: "Zain",
//           batting: {
//             runs: 0,
//             balls: 0,
//             fours: 0,
//             sixes: 0,
//             status: "Yet to Bat",
//             isOut: false,
//           },
//           bowling: {
//             overs: 0,
//             maidens: 0,
//             runs: 0,
//             wickets: 0,
//             balls: 0,
//           },
//         },
//       ],
//     },
//   ],
//   innings: [],
//   scoreboard: [],
//   overs: 1,
//   target: 0,
//   winning: {},
// };

const initialState = {
  id: null,
  toss: {
    winnerTeam: "",
    decision: "",
  },
  teams: [],
  innings: [],
  scoreboard: [],
  overs: 0,
  target: 0,
  winning: null,
  matchVenue: "",
  matchEnded: false,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,

  reducers: {
    createMatch(state, action) {
      state.id = action.payload.id;
    },
    addTeam(state, action) {
      state.teams = action.payload.teams;
    },
    setToss(state, action) {
      state.toss = action.payload.toss;
    },
    setOvers(state, action) {
      state.overs = action.payload;
    },
    setVenue(state, action) {
      state.matchVenue = action.payload;
    },

    startInnings(state, action) {
      state.innings.push({
        ...action.payload,
        isCompleted: false,
      });
    },

    endInnings(state, action) {
      const { inningsIndex } = action.payload;
      state.innings[inningsIndex].isCompleted = true;
    },

    changeBowler(state, action) {
      const { inningsIndex, bowlerName } = action.payload;
      const inning = state.innings[inningsIndex];
      if (inning) {
        state.innings[inningsIndex].bowler = bowlerName;
      }
    },

    changeBatsman(state, action) {
      const { inningsIndex, batsmanName } = action.payload;
      const inning = state.innings[inningsIndex];
      if (inning) {
        inning.striker = batsmanName;
      }
    },

    addBall(state, action) {
      let { inningsIndex, ball } = action.payload;

      const inning = state.innings[inningsIndex];
      const teams = state.teams;

      const winnerIndex = state.toss.winnerTeam === state.teams[0].name ? 0 : 1;

      const loserIndex = winnerIndex === 0 ? 1 : 0;

      let currentbattingteam =
        state.toss.decision === "BAT" ? winnerIndex : loserIndex;

      if (inningsIndex === 1) {
        currentbattingteam = currentbattingteam === 0 ? 1 : 0;
      }

      const currentbowlingteam = currentbattingteam === 0 ? 1 : 0;

      if (!inning) return;

      const extra = ball.extra;

      const isWide = extra?.type === "wd";
      const isLegBye = extra?.type === "lb";
      const isNoBall = extra?.type === "nb";

      const context = {
        inning,
        score: inning.score,
        batRuns: ball.batRuns,
        extra,
        wicket: ball.wicket,
        legalBall: ball.legalBall,
        extraRuns: extra?.runs ?? 0,
        isWide,
        isNoBall,
        isLegBye,
        totalRuns: ball.totalRuns,
        currentbattingteam,
        currentbowlingteam,
        teams,
        state,
        inningsIndex,
      };

      eachPlayerScore(context);
      addBallHistory(context);
      ChangeBallandOver(context);
      if (isInningEnd(context)) {
        state.innings[inningsIndex].isCompleted = true;
        state.target = state.innings[inningsIndex].score.runs + 1;
      }
      if (inningsIndex > 0) {
        checkWins(context);
      }
    },
  },
});

export const {
  createMatch,
  changeBowler,
  setToss,
  setOvers,
  setVenue,
  addTeam,
  endInnings,
  startInnings,
  changeBatsman,
  addBall,
} = scoreSlice.actions;

export default scoreSlice.reducer;
