// Efficiency Factor
//
// EF = normalized power / average heartrate
//
// Vance, Jim. "Run with Power", page 98

#include "normalized_power.js"

function ef(data) {
  // extract relevant data
  const {heartrate, power} = data;

  // guard
  if (!heartrate || !power) {
    return null;
  }

  return (heartrate / np(data));
}

// Additional code when added to tredict:
//
//APPEND return Number(ef(this).toFixed(2))
