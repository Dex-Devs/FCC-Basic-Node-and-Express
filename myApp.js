var express = require('express');
var app = express();
// path to html
const absolutePath = __dirname + `/views/index.html`;
// middleware funtion
app.use( (req, res, next)=> {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  })
  
  // mounting static assets to specific route with app.use method
  
  // path to asses file - __dirname + "/public"
  // intercept route handlers with middleware using "express.static(path)"
  
  /* // NORMAL USAGE -- cant find static assets folder
  app.use(express.static(__dirname + "/public")) // applies to all routes as default */
  
  // LOADING FROM /public ROUTE
  app.use("/public",express.static(__dirname + "/public"));
  
  // **** USING root endpoint will not load the static files because our local html file references our css file using the absolute path while in our server it uses localhost to reference our css file.
  
  
  // serving a string 
  /* app.get("/", (req, res) => {
    res.send("Hello Express");
  }) */
  
  // serving an html file
  app.get("/", (req, res) => {
    res.sendFile(absolutePath);
  })
  
  // serving json
  app.get("/json", (req, res) => {
  
    let responseJSON = {
      message: "Hello json"
    }
  
    if(process.env.MESSAGE_STYLE === "uppercase"){
      res.json({...responseJSON, message: responseJSON.message.toUpperCase()})
    }else {
      res.json(responseJSON);
    }
  })
  
  app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, (req, res) => {
    res.json({
      time: req.time
    });
  })

// console.log("Hello World");
































 module.exports = app;
