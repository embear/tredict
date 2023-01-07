// Running Stress Score
//
// RSS quantifies your day-by-day running intensity relative to your critical
// power. This makes RSS comparable, enabling self-comparison throughout
// a training season, training load comparison between different workout types,
// as well as comparison between athletes with different abilities.
//
// ATTENTION: it is assumed that the value FTP is set to critical power!
//
//   relative power sample = (power sample / critical power)
//
// where the value of relative power sample is limited between 0.5 and 1.5
//
//   RSS = sum of 108 / 3600 * sample duration in seconds * relative power sample ^ 3.5
//
// Tredict does not support accessing seriesSampled in aggregation graphs. For
// this use case a simplified calculation is used. During data evaluation it
// turned out that the following calculation is a good replacement that yields
// almost the same RSS value that is sufficient accurate for the aggregation
// graph.
//
//   relative power = (normalized power / critical power)
//
// where the value of relative power is limited between 0.5 and 1.5
//
//   RSS = 108 /3600 * activity duration * relative power ^ 3.5
//
// https://blog.stryd.com/2017/01/28/running-stress-score
// http://www.georgeron.com/2017/08/an-equation-for-running-stress-score-rss.html
// https://www.vermail.nl/datarun-premium/?page=26

function RSS(data) {
  // check if data series is available
  if (data.hasOwnProperty('seriesSampled') &&
      data.seriesSampled.data.hasOwnProperty('power')) {
    // do exact calculation

    // extract relevant data
    const {
      duration: duration,
      ftp: ftp,
      seriesSampled: {
        data: {
          power
        }
      }
    } = data;

    // guard
    if (!duration ||
        !ftp ||
        ftp === 0 ||
        !power) {
      return null;
    }

    var relative_power_sum = 0;
    const seconds_per_sample = (duration / power.length).toFixed();

    for (const power_sample of power) {
      // limit value range of relative power sample [0.5,1.5]
      const relative_power_sample = Math.max(0.5, Math.min((power_sample / ftp), 1.5));
      relative_power_sum += Math.pow(relative_power_sample, 3.5);
    }

    const rss = 108 / 3600 * seconds_per_sample * relative_power_sum;

    return rss.toFixed();
  } else {
    // do approximated calculation

    // extract relevant data
    const {
      duration: duration,
      ftp: ftp,
      powerPerceived: powerPerceived
    } = data;

    // guard
    if (!duration ||
        !ftp ||
        ftp === 0 ||
        !powerPerceived) {
      return null;
    }

    // limit value range of relative power [0.5,1.5]
    const relative_power = Math.max(0.5, Math.min((powerPerceived / ftp), 1.5));
    const rss = 108 / 3600 * duration * Math.pow(relative_power, 3.5);

    return rss.toFixed();
  }
}

// Additional code when added to tredict:
//APPEND return RSS(this);
