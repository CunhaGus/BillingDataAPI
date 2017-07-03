const routes = require('express').Router();
const billingDB = require('./../dal.js');

//GET API
routes.get('/invoicesubtype/:invoicesubtypeid/claimdate/:claimdateid/', function(req , res){

    var query = 'SELECT ph.id, ist.Description invoicesubtypeName, r.Description regionName, convert(nvarchar(12),cs.ClaimDate,103) claimDate, s.Description statusName, ph.total '
        query += 'FROM ppsheader ph '

        query += 'INNER JOIN claimstatus cs '
        query += 'ON cs.id = ph.ClaimStatusId '
        query += 'AND cs.ClaimDate = (SELECT claimdate FROM claimstatus WHERE id = ' + req.params.claimdateid + ') '

        query += 'INNER JOIN ContractInvoicing_Funder_Region cifr '
        query += 'ON  cifr.ContractInvoicingId = cs.ContractInvoicingId '
        query += 'AND cifr.FunderId = cs.FunderId '
        query += 'AND cifr.RegionId = cs.RegionId '

        query += 'INNER JOIN ContractInvoicing ci '
        query += 'ON  ci.id = cs.ContractInvoicingId '
        query += 'AND ci.InvoiceSubTypeId = ' + req.params.invoicesubtypeid

        query += ' INNER JOIN InvoiceSubType ist '
        query += 'ON ist.id = ci.InvoiceSubTypeId '

        query += 'INNER JOIN region r '
        query += 'ON r.id = cifr.RegionId '

        query += 'INNER JOIN status s '
        query += 'ON s.Id = ph.StatusId '

        query += 'WHERE ph.statusid IN (7,8)'   

    billingDB.executeQuery(res, query);
});

module.exports = routes;