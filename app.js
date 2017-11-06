var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));//include body parser for form data
app.set("view engine","ejs"); //set view engine to remove ejs extension(store all your ejs files here)
app.use(express.static(__dirname + "/public"));//serve static files egCSS files


//Define root route
app.get("/",function(req,res){
    res.render("index");
});

//Define funding route
app.get("/fund",function(req,res){
    res.render("fund");
});


app.listen(3000,function(req,res){
    console.log("Server started. Listening on port 3000")
});