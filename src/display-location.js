const meadows = require('./locations/meadows');
const ashland = require('./locations/ashland');
const bachelor = require('./locations/bachelor');
const hoodoo = require('./locations/hoodoo');
const skibowl = require('./locations/ski-bowl');
const willamette = require('./locations/willamette-pass');
const timberline = require('./locations/timberline');

exports.converToSlack = function(data) {
  console.log(data)
  const {name, location, url, condition} = data;
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${name}*`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Directions'
          },
          url: location
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Conditions:* ${condition.temperature} ${condition.condition} ${condition.snowdepth}`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Website'
          },
          url: url
        }
      }
    ]
  }
};
