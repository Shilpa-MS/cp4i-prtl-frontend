
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


// Cloud Env DB connection
if(!appEnv.isLocal) {
	
	 // Within the application environment (appenv) there's a services object
    var services = appEnv.services;
    var mongodb_services = services["compose-for-mongodb"];
    // This check ensures there is a services for MongoDB databases
    assert(!util.isUndefined(mongodb_services), "Must be bound to compose-for-mongodb services");
   // We now take the first bound MongoDB service and extract it's credentials object
    var credentials = mongodb_services[0].credentials;   
    // Within the credentials, an entry ca_certificate_base64 contains the SSL pinning key
    // We convert that from a string into a Buffer entry in an array which we use when
    // connecting.
    var ca = [new Buffer(credentials.ca_certificate_base64, 'base64')];
    // This is a global variable we'll use for handing the MongoDB client around
    var mongodb;
    // This is the MongoDB connection. From the application environment, we got the
    // credentials and the credentials contain a URI for the database. Here, we
    // connect to that URI, and also pass a number of SSL settings to the
    // call. Among those SSL settings is the SSL CA, into which we pass the array
    // wrapped and now decoded ca_certificate_base64,
    MongoClient.connect(credentials.uri, {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: ca,
            poolSize: 1,
            reconnectTries: 1
        }
    },
    function(err, db) {
        // Here we handle the async response. This is a simple example and
        // we're not going to inject the database connection into the
        // middleware, just save it in a global variable, as long as there
        // isn't an error.
        if (err) {
            console.log(err);
        } else {
            // Although we have a connection, it's to the "admin" database
            // of MongoDB deployment. In this example, we want the
            // "examples" database so what we do here is create that
            // connection using the current connection.
            mongodb = db.db(dbName);
			_mongodb = mongodb;
    
      // Response handling
    let response = {
        status: 200,
        data: [],
        message: null
    };    
	}});
       
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
	
	
}

/**************************************************************/
/*UpdateUserStatus=function(req,res){
	
	console.log("------------------------------------------------------");
	console.log(req.body );
	console.log("");
	console.log(req.params.key);
	
	
	if(appEnv.isLocal) {
		
			dbConnection().then(function(db){
					
					db.collection(userCollection).update({'email':req.body.email}, {$set:{'user_type':req.body.user_type,'app_id':req.body.app_id,'status':req.body.status}},function(err, result){
						if (err) {
							throw err;
							console.log('Record Update Failed');
							res.json({status:500, message: 'Failed'});  
						}
						if (result) {
							console.log('Record Updated Successfully!');
							res.json({status:200, message: 'Success'});  
						}		
				});	
				
			}).catch(function(error){
				console.log(error);
			});
	}
	
	
}*/

/************************************************************************/


/*fetchMenuMasterData=function(req,res){ 
	
	console.log("------------------------fetch all markers------------------------------");
	console.log("");
	console.log(req.body);
	console.log("");
	
	
	if(appEnv.isLocal) {		 
			dbConnection().then(function(db){				
				db.collection(MasterMenuColl).find({app_id:req.body.app_id}).toArray(function(err,result){			
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
	
	

}*/

/************************************************************************/

/*InsertMenuMasterData=function(req,res){ 
	
	console.log("------------------------------------------------------");
	console.log("");
	
	if(appEnv.isLocal) {		  
			dbConnection().then(function(db){
				
				db.collection(MasterMenuColl).insert(req.body,function(err,result){
			
				if(err){
					res.json({status:500, message: 'Failed'});
					throw err;					
				}else{													  
					res.json({status:200, message: 'Success'}); 
				}                
            });
				
			}).catch(function(error){
				console.log(error);				
			});
	}
	
	
	

}*/

/************************************************************************/
/*SaveMenuMasterData=function(req,res){ 
	
	console.log("------------------------------------------------------");
	console.log("");
	
	if(appEnv.isLocal) {		  
			dbConnection().then(function(db){
				
				db.collection(MasterMenuColl).insert(req.body,function(err,result){
			
				if(err){
					res.json({status:500, message: 'Failed'});
					throw err;					
				}else{													  
					res.json({status:200, message: 'Success'}); 
				}                
            });
				
			}).catch(function(error){
				console.log(error);				
			});
	}
	
	
	

}*/

/************************************************************************/


/*UpdateMenuMasterData=function(req,res){
	
	console.log("------------------------------------------------------");
	console.log(req.body );
	console.log("");
	
	
	if(appEnv.isLocal) {
		
			dbConnection().then(function(db){
					
					db.collection(MasterMenuColl).update({'_id':req.body._id}, {$set:{'menu':req.body.menu}},function(err, result){
						if (err) {
							throw err;
							console.log('Record Update Failed');
							res.json({status:500, message: 'Failed'});  
						}
						if (result) {
							console.log('Record Updated Successfully!');
							res.json({status:200, message: 'Success'});  
						}		
				});	
				
			}).catch(function(error){
				console.log(error);
			});
	}
	
	
	
}*/

/************************************************************************/

/*fetchProdMasterData=function(req,res){ 
	
	console.log("------------------------fetch all markers------------------------------");
	
	if(appEnv.isLocal) {		 
			dbConnection().then(function(db){				
				db.collection(MasterProdColl).find({}).toArray(function(err,result){			
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
	
	

}*/

/************************************************************************/

/************************************************************************/

/*InsertProdMasterData=function(req,res){ 
	
	console.log("------------------------------------------------------");
	console.log("");
	
	if(appEnv.isLocal) {		  
			dbConnection().then(function(db){
				
				db.collection(MasterProdColl).insert(req.body,function(err,result){
			
				if(err){
					res.json({status:500, message: 'Failed'});
					throw err;					
				}else{													  
					res.json({status:200, message: 'Success'}); 
				}                
            });
				
			}).catch(function(error){
				console.log(error);				
			});
	}
	
	
	

}*/

/************************************************************************/



app.get('/',function(req,res){
	res.send("Bank Location Details API is UP");
})

/**************************************************************/
//---------


/* router.route('/api/jumpstat/getallMenuMaster').post(fetchMenuMasterData);  
router.route('/api/jumpstat/saveMenuMasterData').post(SaveMenuMasterData);
router.route('/api/jumpstat/updateMenuMasterData').post(UpdateMenuMasterData);
router.route('/api/jumpstat/InsertMenuMastetData').post(InsertMenuMasterData);
router.route('/api/jumpstat/getallProdMaster').get(fetchProdMasterData);
router.route('/api/jumpstat/InsertProdMasterData').post(InsertProdMasterData); */
router.route('/api/jumpstat/registerJumpstart').post(UserRegisterJumpstart);    	    		
router.route('/api/jumpstat/authenticateJumpstart').post(UserAuthenticateJumpstart);	
router.route('/api/jumpstat/fetchUserDataJumpstart').post(fetchUserDataJumpstart);
/* router.route('/api/jumpstat/UpdateUserStatus').post(UpdateUserStatus); */
	



//START SERVER
var port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", function () {
    console.log("Application running on Port " + port);
  });
  
  


  