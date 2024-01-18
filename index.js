// index.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// the timestmap microservice api  
app.get("/api/:date?", function (req, res) {
  let {date} = req.params;
  let new_date;
  const timestampregex=/^\d+$/;
  const dateregex=/^(\d{4}-\d{2}-\d{2}|(\d{2} [a-zA-Z]+ \d{4}, GMT))$/
  if(!date){
    new_date= new Date()
  }else{
       if(timestampregex.test(date)){
      new_date=new Date(parseInt(date))
    }else{
      if(dateregex.test(date)){
        new_date=new Date(date)
      }else{
      res.json({error:"Invalid Date"})
        return;
      }
    }

  }
  res.json({unix:new_date.getTime(),utc:new_date.toUTCString()})
 });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
