exports.converToSlack = function(data) {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${data.name}*`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Directions'
          },
          url: data.location
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Conditions:* 32* clear 4\" 12hr'
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Website'
          },
          url: data.url
        }
      }
    ]
  }
};
