var express = require("express");
var app = express();
var mongoose = require("mongoose");
var routes = require("./routes/routes.js");

mongoose.set("useNewUrlParser",true);
mongoose.set("useCreateIndex",true);
mongoose.set("useUnifiedTopology",true);
mongoose.set("useFindAndModify",false);

mongoose.connect("mongodb+srv://vishal:vishal1408@cluster0.4a7iz.mongodb.net/api-aws");

app.use(routes);


let port = process.env.PORT;
if(port==null || port=="") port=3000;
app.listen(port,()=>{
  console.log(`Server started on port - ${port}`);
})
