// Intensity Factor
//
// IF = normalized power / rFTPw
//
// Vance, Jim. "Run with Power", page 71

function IF(data) {
  // extract relevant data
  const {ftp, powerPerceived} = data;

  // guard
  if (!ftp || ftp === 0 || !powerPerceived) {
    return null;
  }

  return (powerPerceived / ftp);
}

// Additional code when added to tredict:
//APPEND return Number(IF(this).toFixed(2))
