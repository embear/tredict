// Variability Index
//
// VI = normalized power / average power
//
// Vance, Jim. "Run with Power", page 77
//
// https://cyklopedia.cc/cycling-tips/normalized-power-and-variability-index/
//
// Variability Index can be from 1.00 to around 1.40.
//
//   * 1.00 is a perfectly steady workout, that how we would like to race time trial.
//   * 1.00 – 1.05 is a standard time trial.
//   * 1.05 – 1.15 is a casual workout.
//   * 1.15 – 1.20 is a typical road race.
//   * 1.20 – 1.40 is a mountain bike race.

function VI(data) {
  // extract relevant data
  const {power, powerPerceived} = data;

  // guard
  if (!power || power === 0 || !powerPerceived) {
    return null;
  }

  return (powerPerceived / power)
}

// Additional code when added to tredict:
//APPEND return VI(this).toFixed(2)
