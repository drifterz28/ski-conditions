const cheerio = require('cheerio');
const request = require('request-promise-native');

module.exports = function(location) {
  console.log('test')
  var options = {
    uri: location.conditionsUrl,
    transform: (body) => cheerio.load(body)
  };

  return request(options).then($ => {
    const $data = $('.conditions-glance');
    const $current = $data.find('.conditions-current');
    const $conditions = $current.find('.conditions');

    const temperature = $current.find('.temperature').text();
    const datetime = $current.find('time').attr('datetime');
    const condition = $conditions.text();
    const windspeed = $('.windspeed').eq(0).text();
    const snowdepth = $('.snowdepth-base').text().trim();
    location.condition = {
      temperature,
      condition,
      windspeed,
      snowdepth
    };
    return location;
  });
};
