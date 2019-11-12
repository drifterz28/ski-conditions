const express = require('express');

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
                "text": "*It's 80 degrees right now.*"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Partly cloudy today and tomorrow"
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
