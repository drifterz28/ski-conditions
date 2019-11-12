const cheerio = require('cheerio');
const request = require('request');

module.exports = () => {
  const url = 'https://www.timberlinelodge.com/conditions';
  request(url, function(error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const $data = $('.conditions-panels');
      const $conditions = $data.find('i.weather-icon');
      const $date = $data.find('date');
      const $snowConditions = $data.find('.conditions-panel');
      const monthDay = $date.text().trim();
      const time = $date.next('small').text().replace('Updated at', '');
      const dateTime = new Date(`${monthDay} ${time}`);
      const json = {
        location: 'Timberline',
        temperature: $data.find('.temp strong').text(),
        datetime: dateTime.toString(),
        conditions: {
          text: $conditions.attr('title'),
          icon: $conditions.attr('class').replace('weather-icon wi', '').trim().replace('wi-', '')
        },
        windspeed: $('.windspeed').eq(0).text(),
        snowdepth: $('.snowdepth-base').text().trim(),
      };

      $('.conditions-snowfall dl').each(function(i, elem) {
        json[$(elem).find('.metric').text()] = $(elem).find('.depth').text();
      });
      return json;
    }
  });
};
