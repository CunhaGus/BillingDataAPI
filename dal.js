const sql=require("mssql");               
const csv=require('csvtojson');
//const dbConfig=require('./config.billingdatabase.js');
//const dbConnectionString = dbConfig

const dbConnectionString = process.env.billingdbconnectionstring

console.log(dbConnectionString);

var dbConnection = sql.connect(dbConnectionString, (err) =>
                {
                    if (err)
                    {
                        console.log("Error while connecting to the database :- " + err);
                        //res.send(err);
                        res.sendStatus(501).send(err);
                    }
                });

ExecuteWithTransaction = (storedProcName, params, callBack) =>
{
    const transaction = new sql.Transaction(/* [pool] */)
    transaction.begin(err => {
        // ... error checks 
    
        let rolledBack = false
    
        transaction.on('rollback', aborted => {
            // emited with aborted === true     
            rolledBack = true
        })


        request = new sql.Request(transaction)    

        for(i = 0; i < params.length; i++){
            request.input(params[i].paramName, params[i].sqlType, params[i].value);
        }

        request.execute(storedProcName, (err, result) => {
    
            if (err) {
                if (!rolledBack) {
                    transaction.rollback(err => {
                        this.err=err;
                        /*console.log(err)
                        callBack('Error during rollback: ',err, result);*/
                    })
                    callBack(err, result);
                }
            } else {
                transaction.commit(err => {
                 this.err=err;
                })
                callBack(err, result);
            }
        })
    })
}

class Parameter
{
    constructor (paramName, sqlType, value)
    {
    this.paramName = paramName;
    this.sqlType = sqlType;
    this.value = value;
    }
}

module.exports = {

    executeQuery : function(res, query){

            // create Request object
            var request = new sql.Request();

            // query to the database
            request.query(query, (err, rs) => {
                    if (err) {
                                console.log("Error while querying database :- " + err);
                                res.send(err);
                                }
                    else {
                    res.send(rs.recordset);
                            }
                        });
        },

    importPPSFile : function(res, invoiceSubTypeId, regionId, claimStatusId, ppsFileContent){
            var ppsFileContentJSON='';
            //workerNum:4 - this option allows more than one cpu core to be utilised            
            //{flatKeys:true}
            csv()
            .fromString(ppsFileContent)
            .on('end_parsed',(jsonArrObj)=>{
                ppsFileContentJSON=JSON.stringify(jsonArrObj).replace(/'/g, '\'\'')
            })
            .on('done',()=>{        

                let parameters = []
                parameters.push(new Parameter('InvoiceSubTypeId', sql.TYPES.Int, invoiceSubTypeId));
                parameters.push(new Parameter('RegionId', sql.TYPES.Int, regionId));
                parameters.push(new Parameter('ClaimStatusId', sql.TYPES.Int, claimStatusId));
                parameters.push(new Parameter('PPSFileContent', sql.TYPES.NVarChar(), ppsFileContentJSON));               

                ExecuteWithTransaction('ImportPPSFile', parameters, (err, result) => {
                    if (err) {
                                console.log("Error while importing PPS File :- " + err);
                                res.send(err);
                                }
                    else {
                        res.send(result);
                            }
                    })           
            });
        },
            
  deletePPSFile : function(res, ppsHeaderId){
                let parameters = []
                parameters.push(new Parameter('PPSHeaderId', sql.TYPES.Int, ppsHeaderId));

                ExecuteWithTransaction('DeletePPSFile', parameters, (err, result) => {
                    if (err) {
                                console.log("Error while deleting PPS File :- " + err);
                                res.send(err);
                                }
                    else {
                        res.send(result);
                            }
                    })           
            }
    }
