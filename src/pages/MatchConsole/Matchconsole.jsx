import { useEffect, useState } from "react";
import "./Matchconsole.css";
import { useDispatch, useSelector } from "react-redux";
import StartMyInnings from "../StartMyInnings/StartMyInnings";
import ExtraRunsComponent from "./ExtraRunsComponent";
import Selection from "../../pages/Selection/Selection";
import LiveScore from "../liveScore/LiveScore";
import { Scorecard } from "../Scorecard/Scorecard";
import {
  startInnings,
  addBall,
  changeBowler,
  changeBatsman,
  endInnings,
} from "../../redux/matchSlice";
import MatchResult from "../MatchResult/MatchResult";

const Matchconsole = () => {
  const scores = useSelector((state) => state.score);
  const state = useSelector((state) => state);
  const target = useSelector((state) => state.target);

  const [showScorecard, setShowScorecard] = useState(false);

  const dispatch = useDispatch();

  const [showSetup, setShowSetup] = useState(true);
  const [showBowlerSelection, setShowBowlerSelection] = useState(false);
  const [inningIndex, setInningIndex] = useState(0);
  const [showBatsmanSelection, setShowBatsmanSelection] = useState(false);

  const [showExtraRuns, setShowExtraRuns] = useState(false);
  const [batExtraRun, setBatExtraRun] = useState(0);
  const [extraType, setExtraType] = useState(null);
  const [value, setvalue] = useState("");

  console.log(scores);

  let [previousScore, setPreviousScore] = useState({
    run: 0,
    wicket: 0,
  });

  const { matchEnded, winning } = useSelector((state) => state.score);

  const illegalBalls = ["nb", "lb", "wd"];

  if (!scores?.teams || scores.teams.length < 2 || !scores?.toss) {
    return <div>Waiting for match setup...</div>;
  }

  const tossWinner = scores.toss.winnerTeam || scores.toss.won;
  const decision = scores.toss.decision || scores.toss.choose;

  const firstBattingTeam =
    tossWinner === scores.teams[0].name
      ? decision === "BAT"
        ? scores.teams[0].name
        : scores.teams[1].name
      : decision === "BAT"
        ? scores.teams[1].name
        : scores.teams[0].name;

  const firstBowlingTeam =
    firstBattingTeam === scores.teams[0].name
      ? scores.teams[1].name
      : scores.teams[0].name;

  let currentBattingTeam =
    inningIndex % 2 === 0 ? firstBattingTeam : firstBowlingTeam;

  let currentBowlingTeam =
    inningIndex % 2 === 0 ? firstBowlingTeam : firstBattingTeam;

  useEffect(() => {
    if (scores.innings[inningIndex]?.isCompleted) {
      setInningIndex((prev) => prev + 1);
      setShowSetup(true);
      let rest = currentBowlingTeam;
      currentBowlingTeam = currentBattingTeam;
      currentBattingTeam = rest;
    }
  }, [scores.innings, inningIndex]);

  const battingTeam = scores.teams.find((t) => t.name === currentBattingTeam);
  const bowlingTeam = scores.teams.find((t) => t.name === currentBowlingTeam);

  if (!battingTeam || !bowlingTeam) {
    return <div>Waiting for toss result...</div>;
  }

  const currentInnings = scores?.innings?.[inningIndex];

  useEffect(() => {
    const overs = currentInnings?.score?.overs;
    const balls = currentInnings?.score?.balls;

    if (
      overs !== undefined &&
      balls === 0 &&
      overs > 0 &&
      !currentInnings?.isCompleted
    ) {
      setShowBowlerSelection(true);
    }
  }, [currentInnings?.score?.overs, currentInnings?.score?.balls]);

  const currentStriker = currentInnings?.striker ?? "";
  const currentNonStriker = currentInnings?.nonStriker ?? "";
  const currentBowler = currentInnings?.bowler ?? "";

  const STRIKER = battingTeam.players.find((p) => p.name === currentStriker);
  const NONSTRIKER = battingTeam.players.find(
    (p) => p.name === currentNonStriker,
  );
  const BOWLER = bowlingTeam.players.find((p) => p.name === currentBowler);

  const currentScore = currentInnings?.score ?? {
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  };

  useEffect(() => {
    if (inningIndex === 0) {
      setPreviousScore({
        run: 0,
        wicket: 0,
      });
      return;
    }

    const previousInning = scores.innings?.[inningIndex - 1];

    if (!previousInning) return;

    setPreviousScore({
      run: previousInning.score.runs,
      wicket: previousInning.score.wickets,
    });
  }, [inningIndex, scores.innings]);

  const handleStartInnings = ({ striker, nonStriker, bowler }) => {
    dispatch(
      startInnings({
        striker,
        nonStriker,
        bowler,
        balls: [],
        score: {
          runs: 0,
          wickets: 0,
          overs: 0,
          balls: 0,
          runRate: 0,
          currentOverRuns: 0,
        },
      }),
    );
    setShowSetup(false);
  };

  const handleBowlerSelected = (selectedBowlerName) => {
    dispatch(
      changeBowler({
        inningsIndex: inningIndex,
        bowlerName: selectedBowlerName,
      }),
    );
    setShowBowlerSelection(false);
  };

  const handleBatsmanSelected = (selectedBatsmanName) => {
    dispatch(
      changeBatsman({
        inningsIndex: inningIndex,
        batsmanName: selectedBatsmanName,
      }),
    );
    setShowBatsmanSelection(false);
  };

  if (matchEnded) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MatchResult
          result={winning}
          battingTeam={currentBattingTeam}
          bowlingTeam={currentBowlingTeam}
        />
      </div>
    );
  }

  const handleScore = async (value, extraRunsInput = 0) => {
    const isLegalBall = !illegalBalls.includes(value);

    const lastBall =
      currentInnings?.balls?.length > 0
        ? currentInnings.balls[currentInnings.balls.length - 1]
        : { over: 0, ball: 0 };

    const isEndOfOver = isLegalBall && lastBall.ball === 6;

    let batRuns =
      value === "." ||
      value === "wd" ||
      value === "nb" ||
      value === "lb" ||
      value === "w"
        ? 0
        : Number(value);

    const isWide = value === "wd";
    const isNoBall = value === "nb";
    const isLegBye = value === "lb";
    const isWicket = value === "w";
    let extra = 0;

    if (isWide) {
      extra = 1 + Number(extraRunsInput);
    } else if (isNoBall) {
      extra = 1 + Number(extraRunsInput);
      batRuns = extraRunsInput;
    } else if (isLegBye) {
      extra = Number(extraRunsInput);
    } else if (!isWicket) {
      batRuns = Number(value);
    }

    const isOddRun = batRuns === 1 || batRuns === 3 || batRuns === 5;

    const shouldSwapStrike = isOddRun !== isEndOfOver;

    let ball = currentInnings.score.balls;
    let over = currentInnings.score.overs;
    dispatch(
      addBall({
        inningsIndex: inningIndex,
        ball: {
          over,
          ball,
          batsman: currentStriker,
          bowler: currentBowler,
          striker: currentStriker,
          nonStriker: currentNonStriker,

          legalBall: isLegalBall,
          batRuns,

          extra: {
            type: isWide || isLegBye || isNoBall ? value : null,
            runs: extra,
          },

          totalRuns: batRuns + extra,

          wicket: {
            isWicket,
            type: isWicket ? "bowled" : null,
            playerOut: isWicket ? currentStriker : null,
            bowlerName: isWicket ? currentBowler : null,
            strikeChange: shouldSwapStrike,

            scoreAfterBall: {
              runs: currentScore.runs + batRuns + extra,
              wickets: isWicket
                ? currentScore.wickets + 1
                : currentScore.wickets,
              overs: `${over}.${ball}`,
            },
          },
        },
      }),
    );

    if (isWicket) {
      setShowBatsmanSelection(true);
    }
  };

  if (showBatsmanSelection && battingTeam && !showSetup) {
    const standardBattingPlayersList =
      battingTeam.players?.playerName || battingTeam.players || [];
    return (
      <Selection
        players={standardBattingPlayersList}
        mode={"batsman"}
        onSelect={handleBatsmanSelected}
      />
    );
  }

  if (showBowlerSelection && bowlingTeam && !showSetup) {
    const standardBowlingPlayersList =
      bowlingTeam.players?.playerName || bowlingTeam.players || [];
    return (
      <Selection
        players={standardBowlingPlayersList}
        mode={"bowler"}
        onSelect={handleBowlerSelected}
        lastBowler={currentBowler}
      />
    );
  }

  if (showSetup && battingTeam && bowlingTeam) {
    return (
      <StartMyInnings
        battingTeam={battingTeam}
        bowlingTeam={bowlingTeam}
        handleStartInnings={handleStartInnings}
      />
    );
  }

  if (showBowlerSelection && bowlingTeam && !showSetup) {
    const standardBowlingPlayersList =
      bowlingTeam.players?.playerName || bowlingTeam.players || [];
    return (
      <Selection
        players={standardBowlingPlayersList}
        mode={"bowler"}
        onSelect={handleBowlerSelected}
      />
    );
  }

  return (
    <div id="main_container">
      <div id="center_container">
        <div id="live_score">
          <div id="live_score_top">
            <div className="team_box">
              <span className="team_name">{currentBattingTeam}</span>
              <span className="score">
                {currentScore.runs}/{currentScore.wickets}
              </span>
              <span className="overs">
                {currentScore.overs}.{currentScore.balls} Overs
              </span>
            </div>

            <span className="vs">VS</span>

            <div className="team_box">
              <span className="team_name">{currentBowlingTeam}</span>
              <span className="score">
                {previousScore.run}/{previousScore.wicket}
              </span>
              <span className="overs">- Overs</span>
              <span>
                Target : {inningIndex != 0 ? previousScore.run + 1 : 0}
              </span>
            </div>
          </div>

          <div id="match_info">
            <div className="info_card">
              <h3>Current Batsmen</h3>

              <div className="batting_heading">
                <span className="player_name">Name</span>
                <span>R</span>
                <span>B</span>
                <span>4s</span>
                <span>6s</span>
                <span>SR</span>
              </div>

              <div className="player_row striker">
                <span className="player_name">
                  ⭐ {currentStriker || "No Batsman"}
                </span>
                <span>{STRIKER.batting.runs}</span>
                <span>{STRIKER.batting.balls}</span>
                <span>{STRIKER.batting.fours}</span>
                <span>{STRIKER.batting.sixes}</span>
                <span>{STRIKER.batting.strikeRate}</span>
              </div>

              <div className="player_row">
                <span className="player_name">
                  {currentNonStriker || "No Batsman"}
                </span>
                <span>{NONSTRIKER.batting.runs}</span>
                <span>{NONSTRIKER.batting.balls}</span>
                <span>{NONSTRIKER.batting.fours}</span>
                <span>{NONSTRIKER.batting.sixes}</span>
                <span>{NONSTRIKER.batting.strikeRate}</span>
              </div>
            </div>

            <div className="info_card">
              <div className="player_row">
                <div className="player_inner_row">
                  <h3>Current Bowler:</h3>
                  <h3>{currentBowler || "Not Selected"}</h3>
                  <h3>
                    {BOWLER.bowling.runs}/{BOWLER.bowling.wickets}
                  </h3>
                  <h3>
                    ({BOWLER.bowling.overs}.{BOWLER.bowling.balls})
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="scorecard_btn"
          onClick={() => setShowScorecard(!showScorecard)}
        >
          {showScorecard ? "✕ Close Scorecard" : "📋 Show Scorecard"}
        </button>

        {showScorecard && (
          <>
            <h1>ScoreCard : </h1>
            <Scorecard
              currentBattingTeam={battingTeam}
              currentBowlingTeam={bowlingTeam}
            />
          </>
        )}

        <LiveScore
          score={currentInnings?.score}
          balls={currentInnings?.balls}
        />

        <div id="run_manipulator">
          <h3>Run Manipulator</h3>
          <div id="score_controller">
            {["0", "1", "2", "3", "4", "6", "wd", "nb", "w", "lb"].map(
              (val) => (
                <button
                  key={val}
                  className={`btns_controllers ${val === "w" ? "wicket" : ""}`}
                  value={val}
                  onClick={() => {
                    if (["wd", "nb", "lb"].includes(val)) {
                      setExtraType(val);
                      setvalue(val);
                      setShowExtraRuns(true);
                      return;
                    }

                    handleScore(val);
                  }}
                >
                  {val}
                </button>
              ),
            )}
            {showExtraRuns && (
              <ExtraRunsComponent
                type={extraType}
                setShowExtraRuns={setShowExtraRuns}
                setBatExtraRun={setBatExtraRun}
                value={value}
                handleScore={handleScore}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matchconsole;
