const express = require('express');
const bodyParser = require('body-parser');

const { options } = require('./src/options');
const { resortList } = require('./src/constants');
const { converToSlack } = require('./src/display-location');

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

const list = {
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Meadows: 44° 12hr 0\" \n Timberline: 40° 12hr 0\" \n Ski Bowl: err, no data"
      }
    }
  ]
};

app.route('/:local?')
  .get((req, res) => {
    // normal query
    const text = req.params.local;
    const locationIndex = resortList.findIndex((item) => item.key === text);
    if(locationIndex < 0) {
      res.status(200).json(options());
    } else {
      res.status(200).json(converToSlack(resortList[locationIndex]));
    }
  })
  .post((req, res) => {
    // for slack
    const query = req.body;
    const text = query.text;

    const locationIndex = resortList.findIndex((item) => item.key === text);

    if(locationIndex < 0) {
      res.status(200).json(options(query.user_name));
    } else {
      res.status(200).json(converToSlack(resortList[locationIndex]));
    }
  });

app.get('/health', (req, res) => {
  res.status(200).json({health: 'good'});
});

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
