const multer  = require('multer');
const uploadService = multer({storage: multer.memoryStorage(), limits: {fileSize: 1000 * 1000 * 2}}); //limits the file size to 2mb
const routes = require('express').Router();
const billingDB = require('./../dal.js');

//POST API
routes.post('/', uploadService.single('ppsfile'), function (req, res, next) {
    billingDB.importPPSFile(res, req.body.invoiceSubTypeId, req.body.regionId, req.body.claimStatusId, req.file.buffer.toString())
})

module.exports = routes;