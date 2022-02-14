// Efficiency Index
//
// EI = speed [m/min] / power [W]
//
// Vance, Jim: Run with Power
//
// Additional code when added to tredict:
//
// `return ei(this)`

function ei(data) {
  if (!data.speed || !data.power || data.power == 0) {
    return null;
  }

  return data.speed * 60 / data.power;
}
