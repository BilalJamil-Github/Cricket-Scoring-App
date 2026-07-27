import { useState } from "react";
import "./Toss.css";
import { useDispatch, useSelector } from "react-redux";
import { setToss } from "../../redux/matchSlice";
import { useNavigate } from "react-router-dom";

const Toss = () => {
  const [flipped, setflipped] = useState(false);
  const [ASelected, setASelected] = useState("HEAD");
  const [tossDetails, setresult] = useState({
    won: "",
    aSelected: ASelected,
    tossResult: "",
    choose: "",
  });

  const dispatch = useDispatch();
  const score = useSelector((state) => state.score);
  const navigate = useNavigate();

  const teamAName = score.teams?.[0]?.name || "Team A";
  const teamBName = score.teams?.[1]?.name || "Team B";

  const flipthecoin = () => {
    generateTossResult();
    setflipped(!flipped);
  };

  const generateTossResult = () => {
    const tossResult = Math.floor(Math.random() * 2) === 0 ? "HEAD" : "TAIL";

    setresult((prev) => ({
      ...prev,
      aSelected: ASelected,
      tossResult,
      won: tossResult === ASelected ? teamAName : teamBName,
    }));
  };

  const Next = () => {
    dispatch(
      setToss({
        toss: {
          winnerTeam: tossDetails.won,
          decision: tossDetails.choose,
          tossResult: tossDetails.tossResult,
          selectedSide: tossDetails.aSelected,
        },
      }),
    );
    navigate("/match-console");
  };

  return (
    <div className="toss-page">
      <div className="toss-card">
        <div id="heading">
          <h1>Match Toss</h1>
          <h4>{teamAName} choose Head or Tail</h4>
        </div>
        <div className="container">
          <span
            className={ASelected === "HEAD" ? "selected" : ""}
            onClick={() => {
              setASelected("HEAD");
            }}
          >
            HEAD
          </span>
          <span
            className={ASelected === "TAIL" ? "selected" : ""}
            onClick={() => {
              setASelected("TAIL");
            }}
          >
            TAIL
          </span>
        </div>
      </div>
      {flipped ? (
        <>
          <div className="toss-card">
            <h2>Toss Result</h2>
            <div id="toss-result">
              <h3>{tossDetails.tossResult}</h3>
            </div>
            <h4>{tossDetails.won} won the Toss</h4>
          </div>
          <div className="toss-card">
            <h4 id="heading_lower">{tossDetails.won} choose what you want</h4>
            <div className="container">
              <span
                onClick={() => {
                  setresult((prev) => ({
                    ...prev,
                    choose: "BAT",
                  }));
                }}
                className={tossDetails.choose == "BAT" ? "selected_type" : ""}
              >
                BAT
              </span>
              <span
                onClick={() => {
                  setresult((prev) => ({
                    ...prev,
                    choose: "BALL",
                  }));
                }}
                className={tossDetails.choose == "BALL" ? "selected_type" : ""}
              >
                BALL
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {flipped ? (
        <button
          className="flip-btn"
          onClick={() => {
            Next();
          }}
        >
          Next
        </button>
      ) : (
        <button
          className="flip-btn"
          onClick={() => {
            flipthecoin();
          }}
        >
          Flip The Coin
        </button>
      )}
    </div>
  );
};

export default Toss;
