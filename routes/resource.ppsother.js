//const express = require('express');
const routes = require('express').Router();
const billingDB = require('./../dal.js');

//GET API
routes.get('/:ppsheaderid', function(req , res){
    var query = 'select '
	query += 'pomr.ppsHeaderId,'
	query += 'pomr.ppsMainResidentiald ppsMainResidentialId,'
	query += 'pomr.totalOther otherTotal,'
	query += 'pomr.autoBenefitOverride,'
	query += 'pomr.autoMoHCorrection ,'
	query += 'pomr.suContribution,'
	query += 'pomr.hospital,'
	query += 'pomr.prison,'
	query += 'pomr.miscellaneous otherMoH,'
	query += 'pomr.comment,'
	query += 'pmr.ihcNumber,'
	query += 'pmr.nhiNumber,'
	query += 'pmr.firstName,'
	query += 'pmr.surname,'
	query += 'convert(nvarchar(12),pmr.startInvPeriod, 103) startDate,'
	query += 'convert(nvarchar(12),pmr.endInvPeriod,103) endDate,'
	query += 'pmr.Days unit,'
	query += 'pmr.ContractRate rate,'
	query += 'pmr.NZSuper superAnnuation,'
	query += 'pmr.InvBen sLiveBenefit,'
    query += 'pmr.PerAllow personalallowance,'
    query += 'pmr.TotalIncGST total,'
    query += 'pmr.other,'
	query += 'pmr.AccomSup accommodationSupplement '
    query += 'from PPSMainResidential pmr '

    query += 'INNER JOIN PPSOtherMainResidential pomr '
    query += 'ON  pmr.Id = pomr.PPSMainResidentiald '
    query += 'AND pmr.PPSHeaderId = pomr.PPSHeaderId '

    query += 'WHERE pmr.PPSHeaderId = ' + req.params.ppsheaderid;

    billingDB.executeQuery(res, query);
});

//PUT API
//routes.put('ppsheader/:ppsheaderid/ppsmainresidential/:id', function(req , res){
routes.put('/:id/ppsheader/:ppsHeaderId', function(req, res){
    /*
    console.log('req.body.suContribution:', req.body.suContribution)
    console.log('req.body.hospital:', req.body.hospital)
    console.log('req.body.prison:', req.body.prison)
    console.log('req.body.otherMoH:', req.body.otherMoH)
    console.log('req.params.comment:', req.params.comment)
    console.log('req.body.comment:', req.body.comment)
    console.log('req.body.ppsHeaderId:', req.body.ppsHeaderId)
    console.log('req.params.id:', req.params.id)
    console.log('req.params.ppsHeaderId:', req.params.ppsHeaderId)
    console.log('called put in data api');
    */
    var firstColumn = true;

    var query = 'UPDATE [PPSOtherMainResidential] SET '

    if (typeof req.body.suContribution !== 'undefined'){
        query += 'SUContribution=' + req.body.suContribution        
        firstColumn = false
    }
    else{
        firstColumn = false
        query += 'SUContribution=NULL'
    }

    if (typeof req.body.hospital !== 'undefined'){        
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Hospital=' + req.body.hospital
    }
    else{
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Hospital=NULL'
    }

    if (typeof req.body.prison !== 'undefined'){
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Prison=' + req.body.prison
    }
    else{
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }        
        query += 'Prison=NULL'
    }

    if (typeof req.body.otherMoH !== 'undefined'){
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Miscellaneous=' + req.body.otherMoH //MOH Other
    }
    else{
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Miscellaneous=NULL'
    }

    if (typeof req.body.comment !== 'undefined'){
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Comment=\'' + req.body.comment + '\''
    }
    else{
        if (firstColumn){            
            firstColumn = false
        }
        else{
            query += ','
        }
        query += 'Comment=NULL'
    }
    
    query += ' WHERE PPSHeaderId=' + req.params.ppsHeaderId;
    //TODO: the spelling of PPSMainResidentiald is incorrect in the database and needs to be fixed
    query += ' AND PPSMainResidentiald=' + req.params.id; //ppsmainresidentialid

    console.log(query);

    billingDB.executeQuery (res, query);
    
});

module.exports = routes;