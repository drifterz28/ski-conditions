const request = require("request");
const getPageHtml = require("./get-page-html");
const { resortList } = require("./constants");

const template = (conditions) => ({
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
    }
  ]
});

module.exports = async function() {
  const resort = await getPageHtml(resortList[3]);
  const data = await template(resort.condition);
  request.post('https://hooks.slack.com/services/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', {
    body: JSON.stringify(data)
  })
};
