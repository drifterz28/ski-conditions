const { converToSlack } = require('./src/display-location');
const { resortList } = require('./src/constants');
const getPageHtml = require('./src/get-page-html');

async function buildIt() {
  const resort = resortList[3];
  const data = await getPageHtml(resort);
  const built = await converToSlack(data);
  console.dir(built)
}
buildIt();
