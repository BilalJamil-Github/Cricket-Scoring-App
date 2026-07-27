import "./Intro.css";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  const moveToFixture = () => {
    navigate("/teams");
  };

  return (
    <div className="intro">
      <div className="inner_intro">
        <h1>🏏 CricScore</h1>
        <p>Welcome to Live Cricket Scoring</p>
        <button
          onClick={() => {
            moveToFixture();
          }}
        >
          Start Match
        </button>
      </div>
    </div>
  );
};

export default Intro;
