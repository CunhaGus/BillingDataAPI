const expresss = require('express')();
const routes = require('express').Router();

const invoicesubtype = require('./resource.invoicesubtype.js');
const region = require('./resource.region.js');
const claimdate = require('./resource.claimdate.js');
const ppsheader = require('./resource.ppsheader.js');
const importPPSFile = require('./resource.importppsfile.js');
const deletePPSFile = require('./resource.deleteppsfile.js');

routes.use('/billingdataapi/invoicesubtype', invoicesubtype)
routes.use('/billingdataapi/region', region)
routes.use('/billingdataapi/claimdate', claimdate)
routes.use('/billingdataapi/ppsheader', ppsheader)
routes.use('/billingdataapi/importppsfile', importPPSFile)
routes.use('/billingdataapi/deleteppsfile', deletePPSFile)

module.exports = routes;