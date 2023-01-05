// Running Stress Score
//
// relative power sample = (power sample / critical power)
//
// where the value of relative power sample is limited between 0.5 and 1.5
//
// RSS = sum of 108 / 3600 * sample duration in seconds * relative power sample ^ 3.5
//
// ATTENTION: it is assumed that the value FTP is set to critical power!
//
// https://blog.stryd.com/2017/01/28/running-stress-score
// http://www.georgeron.com/2017/08/an-equation-for-running-stress-score-rss.html
// https://www.vermail.nl/datarun-premium/?page=26

function RSS(data) {
  // guard
  if (!data.hasOwnProperty('seriesSampled') ||
      !data.seriesSampled.data.hasOwnProperty('power')) {
    return null;
  }

  // extract relevant data
  const { duration, ftp, seriesSampled: { data: { power } } } = data;

  // guard
  if (ftp === 0) {
    return null;
  }

  var relative_power_sum = 0;
  const seconds_per_sample = (duration / power.length).toFixed();

  for (const power_sample of power){
    // limit value range of relative power sample [0.5,1.5]
    const relative_power_sample = Math.max(0.5, Math.min((power_sample / ftp), 1.5));
    relative_power_sum += Math.pow(relative_power_sample, 3.5);
  }

  return (108 / 3600 * seconds_per_sample * relative_power_sum).toFixed()
}

// Additional code when added to tredict:
//APPEND return RSS(this)
