const request = require('request-promise-native');
const getPageHtml = require("./get-page-html");
const weatherData = require('./weather-data');
const { resortList } = require("./constants");

const template = (conditions, nwsReport) => {
  const weatherData = nwsReport.map(report => {
    return {
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": report.iconLink,
          "alt_text": "weather icon"
        },
        {
          "type": "mrkdwn",
          "text": `*${report.period}*`
        },
        {
          "type": "mrkdwn",
          "text": report.text
        }
      ]
    };
  });

  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Conditions:* \n Temp: ${conditions.temperature} \n Weather: ${conditions.condition} \n New Snow: ${conditions.snowdepth}`
        }
      },
      {
        "type": "divider"
      },
      {
        type: "image",
        image_url: `https://www.mtbachelor.com/webcams/snowstake.jpg?${Date.now()}`,
        alt_text: "Mt Bachelor base"
      },
      {
        "type": "divider"
      },
      ...weatherData,
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": "<https://forecast.weather.gov/MapClick.php?lat=43.98886243884903&lon=-121.68182373046875&site=pdt&smap=1&unit=0&lg=en|View More>"
          }
        ]
      }
    ]
  }
};

module.exports = async function() {
  const resort = await getPageHtml(resortList[3]);
  const nwsReport = await weatherData();
  const data = await template(resort.condition, nwsReport);
  request.post(process.env.SLACK_URL, {
    body: JSON.stringify(data)
  });
};
