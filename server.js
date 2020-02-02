var http = require('http'),
express  = require('express'),
bodyParser   = require('body-parser');

var multer = require('multer'); 
const pg    = require('pg');

pg.defaults.ssl = true;
var conString = "postgres://evvarewtkszyzu:37cf89f338fc247367271e8e6aa7edeacca6e68d4db29d2724aa58aa3f619329@ec2-3-220-86-239.compute-1.amazonaws.com:5432/db6fl7cjfgorau";
var express = require('express');
var http = require('http'),
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra');
    
    
function permitirCrossDomain(req, res, next) {
        //en vez de * se puede definir SÓLO los orígenes que permitimos
        res.header('Access-Control-Allow-Origin', '*'); 
        //metodos http permitidos para CORS
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
      }  
      
      var app = express();

      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      
      app.use(express.static('public'));
      app.use(permitirCrossDomain);
      
      
      app.get('/', function(req, res){
        res.send('hello world');
      });

      app.get('/listFruits', (req, res, next) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('SELECT * FROM usuario', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
        
                client.end();
                return res.json(result.rows);
                
            });
        });
    });
    
    app.get('/listFruit/:id',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.params.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result.rows);
            
            });
            
        });
    });
    app.put('/updateFruit',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query("UPDATE frutas SET nombre_fruta='"+req.body.nombre_fruta+"',cantidad='"+req.body.cantidad+"' WHERE id='" + id + "';", function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    });
    app.post('/SaveFruit', (req, res) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
            
            console.log("miau "+util.inspect(req,false,null));
            
            client.query("INSERT INTO  frutas  (nombre_fruta, cantidad) VALUES ('"+req.body.nombre_fruta+"', '"+req.body.cantidad+"');", function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
            
                //console.log(result);
                client.end();
                return res.json(result.rows);
                
            });
            
        });
    });
    app.delete('/deleteFruit',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    
    
    });
    
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});
