// Intensity Factor
//
// IF = normalized power / rFTPw
//
// Vance, Jim. "Run with Power", page 71
//
// https://www.trainingpeaks.com/learn/articles/normalized-power-intensity-factor-training-stress/
//
// Typical IF values for various training sessions or races are as follows:
//
//   * Less than 0.75 recovery rides
//   * 0.75-0.85 endurance-paced training rides
//   * 0.85-0.95 tempo rides, aerobic and anaerobic interval workouts (work and rest periods combined), longer (>2.5 h) road races
//   * 0.95-1.05 lactate threshold intervals (work period only), shorter (<2.5 h) road races, criteriums, circuit races, longer (e.g., 40 km) TTs
//   * 1.05-1.15 shorter (e.g., 15 km) TTs, track points race
//   * Greater than 1.15 prologue TT, track pursuit, track miss-and-out

function IF(data) {
  // extract relevant data
  const {
    ftp,
    powerPerceived
  } = data;

  // guard
  if (!ftp ||
      ftp === 0 ||
      !powerPerceived) {
    return null;
  }

  return (powerPerceived / ftp).toFixed(2);
}

// Additional code when added to tredict:
//APPEND return IF(this);
