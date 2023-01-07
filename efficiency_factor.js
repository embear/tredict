// Efficiency Factor
//
// EF = normalized power / average heartrate
//
// Vance, Jim. "Run with Power", page 98

function EF(data) {
  // extract relevant data
  const {
    heartrate,
    powerPerceived
  } = data;

  // guard
  if (!heartrate ||
      heartrate === 0 ||
      !powerPerceived) {
    return null;
  }

  return (powerPerceived / heartrate).toFixed(2);
}

// Additional code when added to tredict:
//APPEND return EF(this);
