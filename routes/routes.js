var express = require("express");
var router = express.Router();
var User = require("../models/images.js");
var upload = require("../utils/multer.js");
var s3 = require("../utils/aws.js");

router.get("/",(req,res)=>{
  res.send("<h1>HOME</h1>");
});

// maximum 3 images can be uploaded acc. to the given config

router.post("/images",upload.array('images',3),(req,res)=>{
    image={};
    req.files.forEach((data)=>{
      image.url=data.location;
      image.key=data.key;
      image.bucket=data.bucket;
      User.create(image,(err,sol)=>{
        if(err) console.log(err);
        else{
          console.log(sol);
        }
      });
    });
    res.json("Uploaded Successfully");

});

router.get("/images",(req,res)=>{
  User.find({},(err,sol)=>{
    res.json(sol);
  })
})

router.delete("/images",(req,res)=>{
  User.find({},(err,sol)=>{
    sol.forEach(async (data)=>{
    var params = {
     Bucket: data.bucket,
     Key: data.key
     };
  await s3.deleteObject(params,async (er, data)=>{
        if (er) console.log(er, er.stack); // an error occurred
       else {
         console.log(data);
      }
    });
  });
  User.deleteMany({bucket:sol[0].bucket},(error)=>{
    if(error) console.log(error);
    else{

      res.json("Succesfully Deleted al the images");
    }
  })
});


});


module.exports = router;
