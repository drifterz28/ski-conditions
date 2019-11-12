const cheerio = require('cheerio');
const request = require('request');

module.exports = () => {
  const url = 'https://www.skihood.com/the-mountain/conditions';
  request(url, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const $data = $('.conditions-glance');
      const $current = $data.find('.conditions-current');
      const $conditions = $current.find('.conditions');
      const json = {
        conditions: {}
      };

      json['temperature'] = $current.find('.temperature').text();
      json['datetime'] = $current.find('time').attr('datetime');
      json['conditions'].icon = $conditions.data('conditions');
      json['conditions'].text = $conditions.text();
      json['windspeed'] = $('.windspeed').eq(0).text();
      json['snowdepth'] = $('.snowdepth-base').text().trim();

      $('.conditions-snowfall dl').each(function(i, elem) {
        json[$(elem).find('.metric').text()] = $(elem).find('.depth').text();
      });
      return json;
    }
  });
};
