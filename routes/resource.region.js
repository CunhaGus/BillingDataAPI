const routes = require('express').Router();
const billingDB = require('./../dal.js');

//GET API
routes.get('/:invoicesubtypeid', function(req , res){
    var query = 'SELECT distinct cifr.RegionId id, r.description ';
    query += 'FROM Region r ';
    query += 'INNER JOIN ContractInvoicing ci ';
    query += 'ON ci.InvoiceSubTypeId = ' + req.params.invoicesubtypeid;
    query += 'INNER JOIN ContractInvoicing_Funder_Region cifr ';
    query += 'ON  cifr.ContractInvoicingId = ci.Id ';
    query += 'AND cifr.RegionId = r.id ';

    billingDB.executeQuery (res, query);
});

//PUT API
routes.put('/:id', function(req , res){
    var query = 'UPDATE [region] SET description= ' + req.body.Description  + ' WHERE Id= ' + req.params.id;
    billingDB.executeQuery (res, query);
});

//POST API
routes.post('/', function(req , res){
    var query = 'INSERT INTO [region]([Id],[Description]) '
    query += 'VALUES (' + req.body.Id + ',' + req.body.Description + ')';
    billingDB.executeQuery (res, query);
});

//DELETE API
routes.delete('/:id', function(req , res){
    var query = 'DELETE FROM [region] WHERE id=' + req.params.id;
    billingDB.executeQuery(res, query);
});

module.exports = routes;