// Normalized Power
//
// Vance, Jim. "Run with Power", page 46
//
// https://www.mathworks.com/matlabcentral/cody/problems/3064-cycling-normalized-power
//
// In cycling, a power meter is an indispensable tool to record power output
// (in Watts) and measure fitness gains and performance metrics. When analyzing
// the data though, many different workouts can yield approximately the same
// average power, despite major differences between workouts (e.g., a long
// steady effort vs. sprints or intervals). Normalized power (NP) is a method
// to measure the effect of more intense efforts on the overall workout. NP is
// calculated by the following four steps (from Training and Racing with
// a Power Meter by Allen and Coggan):
//
//   1. Calculate a 30-second rolling average of the power data
//   2. Raise these values to the fourth power
//   3. Average the resulting values
//   4. Take the fourth root of the result

function NP(data) {
  // guard
  if (!data.hasOwnProperty('seriesSampled') ||
      !data.seriesSampled.data.hasOwnProperty('power')) {
    return null;
  }

  // extract relevant data
  const { duration, seriesSampled: { data: { power } } } = data;

  // window length in seconds
  const window_length = 30;

  // extrapolate data
  var extrapolated_power = [];
  const seconds_per_sample = (duration / power.length).toFixed();
  var write_idx;
  var read_idx = -1;
  for (write_idx = 0; write_idx < duration; write_idx++) {
    read_idx += write_idx % seconds_per_sample === 0 ? 1 : 0;
    extrapolated_power.push(power[read_idx]);
  }

  // initial window
  var window_sum = 0;
  var add_idx = 0;
  while (add_idx < window_length) {
    window_sum += extrapolated_power[add_idx++];
  }

  // slide the window and calculate the rolling average
  var remove_idx = 0;
  var average_counter = 2;
  var average_of_windows = window_sum;
  while (add_idx < duration) {
    window_sum += extrapolated_power[add_idx++];
    window_sum -= extrapolated_power[remove_idx++];
    var window_average = window_sum / window_length;
    average_of_windows += (Math.pow(window_average, 4) - average_of_windows) / average_counter++;
  }

  return (Math.pow(average_of_windows, 1/4)).toFixed(1)
}

// Additional code when added to tredict:
//APPEND return NP(this)
