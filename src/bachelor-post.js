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
        title: { type: "plain_text", text: "Mt Bachelor base" },
        image_url: `https://www.mtbachelor.com/webcams/pmxlift.jpg?${Date.now()}`,
        alt_text: "Mt Bachelor base"
      },
      {
        "type": "divider"
      },
      ...weatherData
    ]
  }
};

module.exports = async function() {
  const resort = await getPageHtml(resortList[3]);
  const nwsReport = await weatherData();
  const data = await template(resort.condition, nwsReport);
  console.log(JSON.stringify(data))
  request.post(process.env.SLACK_URL, {
    body: JSON.stringify(data)
  });
};


/*
{
      "type": "context",
      "elements": [
        {
          "type": "image",
          "image_url": "http://forecast.weather.gov/newimages/medium/nsn100.png",
          "alt_text": "notifications warning icon"
        },
                {
          "type": "mrkdwn",
          "text": "*Today*"
        },
        {
          "type": "mrkdwn",
          "text": "Snow.  Low around 25. Breezy, with a southwest wind 14 to 23 mph, with gusts as high as 32 mph.  Chance of precipitation is 100%. Total nighttime snow accumulation of 4 to 8 inches possible. "
        }
      ]
    }
    */