const express = require('express');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.status(200).json({health: 'good'});
});

app.post('/', (req, res) => {
  const query = req.body;
  console.log(query)
  res.status(200).json({
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Meadows: 44° 12hr 0\""
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Timberline: 40° 12hr 0\""
            }
        },
        {
          "type": "section",
          "text": {
              "type": "mrkdwn",
              "text": "Ski Bowl: err, no data"
          }
      }
    ]
});
});

app.get('/location/:local', (req, res) => {
  res.status(200).json({location: req.params.local});
});

app.get('/health', (req, res) => {
  res.status(200).json({health: 'good'});
});

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
