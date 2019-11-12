const {resortList} = require('./constants');
exports.options = function(user = '') {
  // console.log(resortList);
  const showList = resortList.reduce((accum, item) => {
    const lineBreak = accum.length > 0 ? ' ': '\n ';
    return accum + `${lineBreak}• ${item.key} - ${item.name}`;
  }, '');
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
          "text": showList
        }
      }
    ]
  };
}
