const cheerio = require('cheerio');
const request = require('request-promise-native');

const meadows = require('./locations/meadows');
const ashland = require('./locations/ashland');
const bachelor = require('./locations/bachelor');
const hoodoo = require('./locations/hoodoo');
const skibowl = require('./locations/ski-bowl');
const willamette = require('./locations/willamette-pass');
const timberline = require('./locations/timberline');

const scrape = {
  meadows,
  timberline,
  bachelor,
  ashland,
  hoodoo,
  willamette,
  skibowl
};

module.exports = function(location) {
  var options = {
    uri: location.conditionsUrl,
    transform: (body) => cheerio.load(body)
  };

  return request(options).then($ => {
    const condition = scrape[location.key]($);
    return {
      ...location,
      condition
    };
  });
};
