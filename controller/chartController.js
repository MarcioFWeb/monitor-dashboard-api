const express = require("express");
const chartController = express.Router();

const fetch = require('node-fetch');
const services = require("../config/services")

/* CHART ROUTES */
chartController.get("/chart/cpu", (_, res) => {
  
  fetch(services.CHART_GET_CPU_URL)
  .then(response => response.json())
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => res.status(500).send(err))  
});

chartController.get("/chart/memory", (_, res) => {
  
  fetch(services.CHART_GET_MEM_URL)
  .then(response => response.json())
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => res.status(500).send(err))  
});

chartController.get("/chart/status", (_, res) => {
  
  fetch(services.CHART_GET_STATUS_URL)
  .then(response => response.json())
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => res.status(500).send(err))  
});

module.exports = chartController;
