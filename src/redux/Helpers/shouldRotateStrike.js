export const shouldRotateStrike = (batRuns, extra) => {
  let physicalRuns = 0;
  let extraRuns = extra?.runs;
  if (extra && (extra.type === "bye" || extra.type === "legBye")) {
    physicalRuns = extraRuns || 0;
  } else if (!extra || extra.type === null) {
    physicalRuns = batRuns || 0;
  } else if (extra && extra.type === "noBall") {
    physicalRuns = batRuns || 0;
  }
  return physicalRuns % 2 !== 0;
};
