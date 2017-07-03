//Initiallising node modules
const app = require("express")();
const bodyParser = require("body-parser");
const routes = require('./routes');
//const db=require('./dal.js');

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware - (Cross Origin Resource Sharing)
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");

    app.disable('x-powered-by') //Best practice to disable 'x-powered-by' so attackers don't target this API based on the technology behind it 

    if (req.method === "OPTIONS") 
        res.sendStatus(200);
    else 
        next();

    //next();
});

// Connecting all routes to the application
app.use('/', routes)

/*
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).render('404.ejs')
})
*/

/*
app.lislisten(process.env.PORT || 8080, () => {
    console.log("BillingDataAPI now running on port", port);
});
*/

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('BillingDataAPI now running on port', port);

});
