const { converToSlack } = require('./src/display-location');
const { resortList } = require('./src/constants');
const getPageHtml = require('./src/get-page-html');

async function buildIt() {
  const resort = resortList[6];
  const data = await getPageHtml(resort);
  const built = await converToSlack(data);
  console.log(built)
}
buildIt()
// console.log(converToSlack(resortList[6]))
