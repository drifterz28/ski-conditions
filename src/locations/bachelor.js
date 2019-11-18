module.exports = function($) {
  const $data = $('.snow-report-tab-conditions');
  const $snowReport = $('.snow-report-tab-weather');
  const temperature = $snowReport.find('.current-section.condition .key').eq(1).text();
  const $snowfall = $data.find('.current-section.condition.first').eq(1);
  const windspeed = $snowReport.find('.current-section.condition.secondary.active').eq(0).text().trim();
  const condition = $snowReport.find('.current-section.condition.first .value div').text().trim();
  const snowdepth = $snowfall.find('.key').eq(0).text() + ' ' + $snowfall.find('.value').eq(0).text();

  return {
    temperature,
    condition,
    windspeed,
    snowdepth
  };
};
