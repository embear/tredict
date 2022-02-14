// Normalized Power
//
// https://www.mathworks.com/matlabcentral/cody/problems/3064-cycling-normalized-power
//
// Additional code when added to tredict:
//
// `return np(this)`

function np(data) {
  if (!data.power) {
    return null;
  }

  // window length in seconds
  var window_length = 30;

  // extrapolate data
  var extrapolated_power = [];
  var seconds_per_sample = Math.round(data.duration / data.seriesSampled.data.power.length);
  var write_idx;
  var read_idx = -1;
  for (write_idx = 0; write_idx < data.duration; write_idx++) {
    read_idx += write_idx % seconds_per_sample === 0 ? 1 : 0;
    extrapolated_power.push(data.seriesSampled.data.power[read_idx]);
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
  while (add_idx < data.duration) {
    window_sum += extrapolated_power[add_idx++];
    window_sum -= extrapolated_power[remove_idx++];
    var window_average = window_sum / window_length;
    average_of_windows += (Math.pow(window_average, 4) - average_of_windows) / average_counter++;
  }

  return Math.pow(average_of_windows, 1/4);
}
