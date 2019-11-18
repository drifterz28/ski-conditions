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
          text: `*Conditions:* \n Temp: ${condition.temperature} \n Weather: ${condition.condition} \n New Snow: ${condition.snowdepth}`
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
