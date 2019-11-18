const express = require('express');
const bodyParser = require('body-parser');

const { options } = require('./src/options');
const { resortList } = require('./src/constants');
const { converToSlack } = require('./src/display-location');
const getPageHtml = require('./src/get-page-html');
const bachelorPost = require('./src/bachelor-post');

const env = process.env;
const app = express();
const port = process.env.PORT || 5000;
app.set('port', port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/health', (req, res) => {
  res.status(200).json({health: 'good'});
});

app.get('/push', (req, res) => {
  bachelorPost();
  res.status(200).json({status: 'done'});
});

app.route('/:local?')
  .get(async (req, res) => {
    // normal query
    const text = req.params.local;
    const locationIndex = resortList.findIndex((item) => item.key === text);
    const resort = resortList[locationIndex];
    if(locationIndex < 0) {
      res.status(200).json(options());
    } else {
      const data = await getPageHtml(resort);
      const built = await converToSlack(data);
      res.status(200).json(built);
    }
  })
  .post(async (req, res) => {
    // for slack
    const query = req.body;
    const text = query.text;

    const locationIndex = resortList.findIndex((item) => item.key === text);
    const resort = resortList[locationIndex];

    if(locationIndex < 0) {
      res.status(200).json(options(query.name));
    } else {
      const data = await getPageHtml(resort);
      const built = await converToSlack(data);
      res.status(200).json(built);
    }
  });

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
