// Run Ratio

function RR(data) {
  // threshold cadence for running/walking/standing
  const run_threshold = 120;
  const walk_threshold = 40;

  // extract relevant data
  const { seriesSampled: { data: { cadence } } } = data;
  const samples = cadence.length;

  // guard
  if (samples === 0) {
    return null;
  }

  // put samples to bins
  var idx;
  var bins = { run: 0, walk: 0, stand: 0 };
  for (idx = 0; idx < samples; idx++) {
    if (cadence[idx] > run_threshold) {
      bins.run++;
    } else if (cadence[idx] > walk_threshold) {
      bins.walk++;
    } else {
      bins.stand++;
    }
  }
  bins.run /= samples;
  bins.walk /= samples;
  bins.stand /= samples;

  return bins
}

// Additional code when added to tredict:
//APPEND return (RR(this).run * 100).toFixed()
