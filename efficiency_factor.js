// Efficiency Factor
//
// EF = normalized power / average heartrate
//
// Vance, Jim. "Run with Power", page 98

#include "normalized_power.js"

function ef(data) {
  if (!data.heartrate || !data.power) {
    return null;
  }

  return data.heartrate / np(data);
}

// Additional code when added to tredict:
//
//APPEND return Number(ef(this).toFixed(2))
