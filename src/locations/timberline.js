module.exports = function($) {
  const $data = $('.conditions-panels');
  const $snowConditions = $data.find('.conditions-panel');
  const temperature = $data.find('.temp strong').text() + '°';
  const $snowfall = $snowConditions.find('dt').eq(1);
  const windspeed = $snowConditions.eq(2).find('dd').eq(2).text();
  const condition = $snowConditions.find('dd').eq(0).text();
  const snowdepth = $snowfall.text() + ' ' + $snowfall.next().text();

  return {
    temperature,
    condition,
    windspeed,
    snowdepth
  };
};
