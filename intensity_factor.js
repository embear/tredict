// Intensity Factor
//
// IF = normalized power / rFTPw
//
// Vance, Jim. "Run with Power", page 71

#include "normalized_power.js"

function IF(data) {
  // extract relevant data
  const {ftp, power} = data;

  // guard
  if (!ftp || !power) {
    return null;
  }

  return (NP(data) / ftp);
}

// Additional code when added to tredict:
//APPEND return Number(IF(this).toFixed(2))
