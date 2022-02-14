// Efficiency Index
//
// EI = average speed / average power
//
// Vance, Jim. "Run with Power", page 99

function ei(data) {
  if (!data.speed || !data.power || data.power == 0) {
    return null;
  }

  // NOTE: speed is in m/min
  return data.speed * 60 / data.power;
}

// Additional code when added to tredict:
//
//APPEND return Number(ei(this).toFixed(2))
