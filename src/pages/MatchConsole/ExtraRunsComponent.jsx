import "./ExtraRunsComponent.css";

const ExtraRunsComponent = ({
  type,
  setShowExtraRuns,
  setBatExtraRun,
  handleScore,
  value,
}) => {
  const addExtraRun = (run) => {
    run = Number(run);
    setBatExtraRun(run);
    handleScore(value, run);
    setShowExtraRuns(false);
  };

  return (
    <div className="extra_runs_overlay">
      <div className="extra_runs_modal">
        <h3>
          {type === "wd" && "Wide - Additional Runs"}
          {type === "nb" && "No Ball - Runs Off the Bat"}
          {type === "lb" && "Leg Bye - Runs Taken"}
        </h3>

        <div className="extra_runs_buttons">
          {[0, 1, 2, 3, 4, 5, 6].map((run) => (
            <button
              style={{
                width: "40px",
                height: "40px",
                color: "white",
                backgroundColor: "green",
              }}
              key={run}
              onClick={() => addExtraRun(run)}
            >
              {run}
            </button>
          ))}
        </div>

        <button className="cancel_btn" onClick={() => setShowExtraRuns(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ExtraRunsComponent;
