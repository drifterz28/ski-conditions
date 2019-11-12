const express = require('express');
const bodyParser = require('body-parser');

const { options } = require('./src/options');
const { resortList } = require('./src/constants');

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

const meadows = {
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Mt Hood Meadows*"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "The *2019 Dundies* happened. \nAwards were given, heroes were recognized. \nCheck out *#dundies-2019* to see who won awards."
      }
    }
  ]
}

const converToSlack = (data) => {
  return {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${data.name}*`
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `<${data.url}|Website> <${data.location}|Directions>`
        }
      },
    ]
  }
}

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
