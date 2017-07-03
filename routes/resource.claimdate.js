const routes = require('express').Router();
const billingDB = require('./../dal.js');

//GET API
routes.get('/:invoicesubtypeid/region/:regionid', function(req , res){
    var query = 'SELECT cs.id, convert(nvarchar(12), cs.claimdate, 103) claimdate ';
    query += 'FROM ClaimStatus cs ';
    query += 'INNER JOIN ContractInvoicing ci ';
    query += 'ON  ci.Id = cs.ContractInvoicingId ';
    query += 'AND ci.InvoiceSubTypeId = ' + req.params.invoicesubtypeid;
    query += ' WHERE statusid IN (1,2,3) ';
    query += 'AND   RegionId = '  + req.params.regionid;
    query += ' ORDER BY cs.claimdate DESC ';

    billingDB.executeQuery(res, query);
});

module.exports = routes;