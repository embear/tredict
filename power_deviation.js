// Power-Deviation
//
// Indicates the deviation between the power values from Stryd vs. Garmin.

function PD(data) {
  // extract relevant data
  const {
    power,
    powerOem
  } = data;

  // guard
  if (!power ||
      !powerOem) {
    return null;
  }

  return Number((power / powerOem).toFixed(2));

  return (powerPerceived / power).toFixed(2);
}

// Additional code when added to tredict:
//APPEND return PD(this);
