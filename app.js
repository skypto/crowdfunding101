var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));//include body parser for form data
// app.use(bodyParser.json());
app.set("view engine","ejs"); //set view engine to remove ejs extension(store all your ejs files here)
app.use(express.static(__dirname + "/public"));//serve static files egCSS files

var key =require("./key.js")
//setup payment api details
var stripe = require("stripe")(key);//API key


//Define root route
app.get("/",function(req,res){
    res.render("index");
});


//Define funding route.
app.get("/fund",function(req,res){
    res.sendFile(__dirname +"/views/fund.html");   
});

//Process the funding
app.post("/fund",function(req,res){
    //get the strip token(generated when the form is submitted)
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    console.log(token +' '+ chargeAmount)
    //below is done to prevent man-in-the middle attack (extra verification)
    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: "eur",
        source: token
    },function(err, charge){
        if (err && err.type === "StripeCardError"){
                console.log("Your card was declined");
        }else{
            res.send("Payment Completed");
        }
    });
    

}); 

app.listen(3000,function(req,res){
    console.log("Server started. Listening on port 3000")
});

