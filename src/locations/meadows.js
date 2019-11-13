const cheerio = require('cheerio');
const request = require('request-promise-native');

module.exports = function($) {
  const $data = $('.conditions-glance');
  const $current = $data.find('.conditions-current');
  const $conditions = $current.find('.conditions');

  const temperature = $current.find('.temperature').text();
  const datetime = $current.find('time').attr('datetime');
  const condition = $conditions.text();
  const windspeed = $('.windspeed').eq(0).text();
  const snowdepth = $('.conditions-snowfall dl').eq(0).find('.depth').text().trim() + ' 12hr';
  return {
    temperature,
    condition,
    windspeed,
    snowdepth
  };
};
