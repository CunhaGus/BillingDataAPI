//const express = require('express');
const routes = require('express').Router();
const billingDB = require('./../dal.js');

//GET API
routes.get('/:invoicetypeid', function(req , res){
    var query = 'select * from InvoiceSubType where invoicetypeid=' + req.params.invoicetypeid;
    billingDB.executeQuery(res, query);
});

//PUT API
/*
routes.put('/:id', function(req , res){
    var query = 'UPDATE [InvoiceSubType] SET'
    query += ' Description= ' + req.body.Name
    query += ',InvoiceTypeID=  ' + req.body.InvoiceTypeID
    query += ',InvoiceFormat=  ' + req.body.InvoiceFormat
    query += ',PPSFormat=  ' + req.body.PPSFormat
    query += ',PPSOtherFormat=  ' + req.body.PPSOtherFormat
    query += ',BCTIFormat=  ' + req.body.BCTIFormat
    query += ',BCTIOtherFormat=  ' + req.body.BCTIOtherFormat
    query += ' WHERE Id= ' + req.params.id;

    billingDB.executeQuery (res, query);
});


//POST API
routes.post('/', function(req , res){
    var query = 'INSERT INTO [InvoiceSubType]([Id],[InvoiceTypeID],[Description],[InvoiceFormat],[PPSFormat],[PPSOtherFormat],[BCTIFormat],[BCTIOtherFormat]) '
    query += 'VALUES (' + req.body.Id + ',' + req.body.InvoiceTypeID + ',' + req.body.Description + ',' + req.body.InvoiceFormat + ',' + req.body.PPSFormat + ',' + req.body.PPSOtherFormat + ',' + req.body.BCTIFormat + ',' + req.body.BCTIOtherFormat + ')';

    billingDB.executeQuery (res, query);
});


//DELETE API
routes.delete('/:id', function(req , res){
    var query = 'DELETE FROM [InvoiceSubType] WHERE id=' + req.params.id;

    billingDB.executeQuery (res, query);
});
*/

module.exports = routes;