module.exports = function($) {
    const $data = $('script');
    const temperature = $data.eq(19).html();
    console.log(temperature)
    console.log('---------------')
    const $snowfall = $data.find('.current-section.condition.first').eq(1);
    const windspeed = $data.find('.ww_snow').text().trim();
    const condition = '';
    const snowdepth = $data.find('.ww_snow').text();

    return {
      temperature,
      condition,
      windspeed,
      snowdepth
    };
  };
