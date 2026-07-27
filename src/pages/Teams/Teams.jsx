import { useState } from "react";
import "./Teams.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTeam,
  createMatch,
  setVenue,
  setOvers,
} from "../../redux/matchSlice";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [matchSetup, setMatchSetup] = useState({
    teamAName: "",
    teamBName: "",
    overs: 0,
    matchVenue: "",
    teamAPlayers: [],
    teamBPlayers: [],
  });

  const createPlayer = () => ({
    name: "",
    batting: {
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      status: "Yet to Bat",
      isOut: false,
    },
    bowling: {
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      balls: 0,
    },
  });

  const addNewPlayer = (team) => {
    if (team === "A") {
      setMatchSetup((prev) => ({
        ...prev,
        teamAPlayers: [...prev.teamAPlayers, createPlayer()],
      }));
    } else {
      setMatchSetup((prev) => ({
        ...prev,
        teamBPlayers: [...prev.teamBPlayers, createPlayer()],
      }));
    }
  };

  const updatePlayer = (team, index, value) => {
    if (team === "A") {
      const players = [...matchSetup.teamAPlayers];
      players[index].name = value;

      setMatchSetup({
        ...matchSetup,
        teamAPlayers: players,
      });
    } else {
      const players = [...matchSetup.teamBPlayers];
      players[index].name = value;

      setMatchSetup({
        ...matchSetup,
        teamBPlayers: players,
      });
    }
  };

  const matchCreated = () => {
    dispatch(
      createMatch({
        id: Math.floor(100000 + Math.random() * 900000),
      }),
    );

    dispatch(setVenue(matchSetup.matchVenue));
    dispatch(setOvers(Number(matchSetup.overs)));
    dispatch(
      addTeam({
        teams: [
          { name: matchSetup.teamAName, players: matchSetup.teamAPlayers },
          { name: matchSetup.teamBName, players: matchSetup.teamBPlayers },
        ],
      }),
    );
    navigate("/toss");
  };

  return (
    <div className="teams-page">
      <h1>Create Match</h1>

      <div id="team-card-holder">
        <div className="team-card-upper">
          <h2>Team 1</h2>

          <div className="inner-team-card-holder">
            <input
              className="input"
              type="text"
              placeholder="Enter Team 1 Name"
              value={matchSetup.teamAName}
              onChange={(e) =>
                setMatchSetup({
                  ...matchSetup,
                  teamAName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="team-card-upper">
          <h2>Team 2</h2>

          <div className="inner-team-card-holder">
            <input
              className="input"
              type="text"
              placeholder="Enter Team 2 Name"
              value={matchSetup.teamBName}
              onChange={(e) =>
                setMatchSetup({
                  ...matchSetup,
                  teamBName: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      <div id="team-card-holder">
        <div className="team-card">
          <h2>Players</h2>

          <div className="inner-team-card-holder">
            {matchSetup.teamAPlayers.map((player, index) => (
              <input
                key={index}
                className="input"
                type="text"
                placeholder="Enter Player Name"
                value={player.name}
                onChange={(e) => updatePlayer("A", index, e.target.value)}
              />
            ))}

            <span className="plus-circle">
              <span onClick={() => addNewPlayer("A")}>+</span>
            </span>
          </div>
        </div>

        <div className="team-card">
          <h2>Players</h2>

          <div className="inner-team-card-holder">
            {matchSetup.teamBPlayers.map((player, index) => (
              <input
                key={index}
                className="input"
                type="text"
                placeholder="Enter Player Name"
                value={player.name}
                onChange={(e) => updatePlayer("B", index, e.target.value)}
              />
            ))}

            <span className="plus-circle">
              <span onClick={() => addNewPlayer("B")}>+</span>
            </span>
          </div>
        </div>
      </div>

      <div className="match-settings">
        <div className="overs-setting">
          <label>Overs</label>

          <select
            value={matchSetup.overs}
            onChange={(e) =>
              setMatchSetup({
                ...matchSetup,
                overs: e.target.value,
              })
            }
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="match-settings-lower">
          <label>Venue (Optional)</label>

          <input
            className="input2"
            type="text"
            placeholder="Ground Name"
            value={matchSetup.matchVenue}
            onChange={(e) =>
              setMatchSetup({
                ...matchSetup,
                matchVenue: e.target.value,
              })
            }
          />
        </div>
      </div>

      <button
        id="button"
        onClick={() => {
          matchCreated();
        }}
      >
        <span>Continue</span>
        <span className="arrow">→</span>
      </button>
    </div>
  );
};

export default Teams;
