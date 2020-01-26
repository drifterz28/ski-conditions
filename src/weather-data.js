const request = require('request-promise-native');

const nwsUrl = 'https://forecast.weather.gov/MapClick.php?lat=43.98886243884903&lon=-121.68182373046875&site=pdt&smap=1&unit=0&lg=en&FcstType=json';
const userAgent = 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';

module.exports = async function() {
  const someArray = [0,1,2,3]
  const {time: { startPeriodName }, data: { text, iconLink}} = await request({uri: nwsUrl, headers: {'user-agent' : userAgent}, json: true});

  return someArray.map((count, i) => {
    return {
      period: startPeriodName[i],
      text: text[i],
      iconLink: iconLink[i]
    };
  });
}