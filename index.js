const express = require('express');
const app = express();
const path = require('path');
const cors = require('express-cors');

const Api = require('./api/api.controller');

app.use(cors({
  allowedOrigins: [
    'negre.co',
    'localhost:8081'
  ]
}));

app.use(express.static(__dirname + '/dist'));

app.get('/api/v1.0/station-info', async (req, res) => {

  const api = new Api();
  const resData = await api.getStationInfo();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('/api/v1.0/station-status', async (req, res) => {

  const api = new Api();
  const resData = await api.getStationStatus();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resData, null, 0));
});

app.get('*', (req, res) => {
  res.redirect(404, 'http://negre.co');
});

module.exports = app;