// Efficiency Index
//
// EI = average speed / average power
//
// Vance, Jim. "Run with Power", page 99

function EI(data) {
  // extract relevant data
  const {
    speed,
    power
  } = data;

  // guard
  if (!speed ||
      !power ||
      power === 0) {
    return null;
  }

  // NOTE: speed is in m/min
  return (speed * 60 / power).toFixed(2);
}

// Additional code when added to tredict:
//APPEND return EI(this);
