
console.log("started");
var express = require("express");
var app = express();
var port = 3000;
var   Q = require('q');
var bodyParser = require('body-parser');
var   http = require('http');
var   path = require('path');
const util = require('util');
const assert = require('assert');
var   f = require('util').format;
var   fs = require('fs');
var dateFormat = require('dateformat');
var ObjectId = require('mongodb').ObjectID;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
/* this is been added for git changes */
app.use(bodyParser.json());


//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//ROUTES FOR OUR API
var router = express.Router(); 
router.use(bodyParser.urlencoded({ extended: true }));


app.use('/', router);
/*****************new*******var*******************/


var _mongodb ;
var  MongoClient = require('mongodb').MongoClient;  

var dbUrl;
var dbConnection ;

const dbName = 'JumpstartDB' ;
/* const MasterMenuColl = 'MenuMasterData';
const MasterProdColl = 'ProdMasterData'; */
const userCollection = 'UserDetail' ;

// Get cfenv and ask it to parse the environment variable
var cfenv = require('cfenv'); 				//Cloud Foundry Environment Variables
var appEnv = cfenv.getAppEnv(); 			// Grab environment variables


if (appEnv.isLocal) {
    require('dotenv').load();   //Not using env for localhost as this is single file Node service
	//var sessionDB = process.env.LOCAL_MONGODB_URL;
	var sessionDB = 'mongodb://localhost:27017/'
	console.log(sessionDB);;
	dbUrl = sessionDB ; // please change it to env variable
}


// Connect to MongoDB Service on IBM Cloud
else if(!appEnv.isLocal) {
    var mongoDbUrl, mongoDbOptions = {};
    var mongoDbCredentials = appEnv.services["databases-for-mongodb"][0].credentials.connection.mongodb;
    var ca = Buffer.from(mongoDbCredentials.certificate.certificate_base64, 'base64');
    mongoDbUrl = mongoDbCredentials.composed[0];
    mongoDbOptions = {
        useNewUrlParser: true,
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        poolSize: 1,
        reconnectTries: 1
    };

    console.log("Your MongoDB is running at ", mongoDbUrl);
    // connect to our database
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoDbUrl, mongoDbOptions)
        .then(res => console.log(res))
        .catch(function (reason) {
            console.log('Unable to connect to the mongodb instance. Error: ', reason);
        });
    //mongoose.connect(mongoDbUrl, mongoDbOptions); // connect to our database
    sessionDB = mongoDbUrl;
}
else{
    console.log('Unable to connect to MongoDB.');
}

/************************************************************************/
if(appEnv.isLocal){
	
	dbConnection = function(){
						var deffered = Q.defer();
						MongoClient.connect(dbUrl, {native_parser: true}, function(err, database) {  
						if (err) 
							deffered.reject(err);
						var db = database.db(dbName);
						console.log('DB Connected at ' + dbUrl);
						deffered.resolve(db);			
						});  
						
						return deffered.promise;
					}					
}

/************************************************************************/

UserRegisterJumpstart=function(req,res){
	
	console.log("------------------------------------------------------");
	console.log("");
	console.log('UserRegisterJumpstart  ' + req.url );
	console.log(req.body);
	console.log("");
	
	var newUser = req.body;
	
	if(appEnv.isLocal) {
			dbConnection().then(function(db){
				
				db.collection(userCollection).insert(newUser, function(err, result) {
					if(err){
					res.json({status:500, message: 'Failed'}); 
					throw err;
				}else{									
				    res.json(result);
				}                
            });
				
			}).catch(function(error){
				console.log(error);				
			});
	}
	
	
	
}

/**************************************************************************************/

UserAuthenticateJumpstart=function(req,res){
	
	console.log("------------------------------------------------------");
	console.log("");
	console.log('UserAuthenticateJumpstart  ' + req.url );
	console.log(req.body);
	console.log("");
	
	if(appEnv.isLocal) {
		
			dbConnection().then(function(db){
					
				db.collection(userCollection).find({email:req.body.email,password:req.body.password}).toArray(function(err, xuser) {
	   
					console.log('xuser = ' + xuser);		
					console.log(xuser);				
					
					if (JSON.stringify(xuser) === '[]') {
						res.json({ status:200, success: false, message: 'Authentication failed. User not found.' });
					} else if (xuser[0].password == req.body.password){
											
			      res.json({status:200, success: true, xuser });
					} else {			
						res.json({ status:200, success: false, message: 'Authentication failed. Wrong password.' });
					}	
					//res.json({message: 'OK'});  
				}); 				
				
			}).catch(function(error){
					console.log(error);
			});					
	}
	
	
}

/**************************************************************/

fetchUserDataJumpstart=function(req,res){
	
	console.log("------------------------------------------------------");
	console.log(req.body);
	console.log("");
	
	if(appEnv.isLocal) {		 
			dbConnection().then(function(db){				
				db.collection(userCollection).find({email:req.body.email}).toArray(function(err,result){			
				if(err){
					res.json({status:500, message: 'Failed'}); 
					throw err;
				}else{									
				    res.json(result);
				}                
            });
				
			}).catch(function(error){
				console.log(error);				
			});
	}
	
	


/************************************************************************/



app.get('/',function(req,res){
	res.send("Jumpstart toolkit API is UP");
})

/**************************************************************/
//---------

router.route('/api/jumpstat/registerJumpstart').post(UserRegisterJumpstart);    	    		
router.route('/api/jumpstat/authenticateJumpstart').post(UserAuthenticateJumpstart);	
router.route('/api/jumpstat/fetchUserDataJumpstart').post(fetchUserDataJumpstart);
	



//START SERVER
var port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", function () {
    console.log("Application running on Port " + port);
  });
  
  


  