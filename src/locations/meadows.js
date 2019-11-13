const cheerio = require('cheerio');
const request = require('request-promise-native');

module.exports = function(location) {
  const url = 'https://www.skihood.com/the-mountain/conditions';
  var options = {
    uri: url,
    transform: (body) => cheerio.load(body)
  };

  const json = request(options).then($ => {
    const $data = $('.conditions-glance');
    const $current = $data.find('.conditions-current');
    const $conditions = $current.find('.conditions');

    console.log($current.find('.temperature').text())
    const temperature = $current.find('.temperature').text();
    const datetime = $current.find('time').attr('datetime');
    // const conditions.icon = $conditions.data('conditions');
    const condition = $conditions.text();
    const windspeed = $('.windspeed').eq(0).text();
    const snowdepth = $('.snowdepth-base').text().trim();
    return {
      temperature,
      condition,
      windspeed,
      snowdepth
    };
  });
  return json;
};
