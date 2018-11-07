const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(morgan('combined'));


app.all('/', (req, res) => {
  console.log('headers:', req.headers);
  console.log('body:', req.body);
  res.send('hello from server');
});

app.listen(3000, () => console.log('listening on 3000'));
