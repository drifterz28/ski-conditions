const resortList = require('./constants');
exports.options = function(user = '') {
  // console.log(resortList);
  return {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hi ${user} :wave:`
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Great to see you here! here is a list of supported locations: you can query them with /conditions <location name>"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "• meadows - Mt Hood Meadows \n • bachelor - Mt Bachelor \n • timberline - Mt Hood Timberline"
        }
      }
    ]
  };
}
