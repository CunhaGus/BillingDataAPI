const routes = require('express').Router();
const billingDB = require('./../dal.js');

//POST API
routes.delete('/:id', function (req, res, next) {
    billingDB.deletePPSFile(res, req.params.id)
})

module.exports = routes;