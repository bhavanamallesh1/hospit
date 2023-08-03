const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(cors());
  mongoose.connect('mongodb://127.0.0.1:27017/oxygen-cylinder-db1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error(err));
const hospitalSchema = new mongoose.Schema({
  name: String,
  hospitalId: String,
  password: String,
  cylinderCount: Number,
  location :String
});
const Hospital1 = mongoose.model('Hospital1', hospitalSchema);
const anji_reddy=new Hospital1({
  name:"anjireddy",
  hospitalId:"5",
  password:"124",
  cylinderCount:10,
  location:"Ongole"
});
const apolo=new Hospital1({
  name:"apolo",
  hospitalId:"6",
  password:"146",
  cylinderCount:17,
  location: "Vemuri"
});
const sunshine=new Hospital1({
  name:"sunshine",
  hospitalId:"56",
  password:"786",
  cylinderCount:19,
  location: "Hyderabad"
});
/*Hospital1.insertMany([anji_reddy,apolo,sunshine])
.then(() => {
  console.log("all details successfully inserted");
})
.catch((err) => {
  console.log(err);
});*/
app.post('/update-cylinder-count', async (req, res) => {
  //  const { name, hospitalId, password, cylinderCount } = req.body;
  const x=req.body.namep;
  const y=req.body.hospitalId;
  const z=req.body.password;
  const cc=req.body.cylinderCount;
  //const hospital = await Hospital1.findOne({ y, z });
  const hospital = await Hospital1.findOne({ hospitalId: y, password: z });
  //const hospital = await Hospital1.findOne({ k, m });
  if (!hospital) {
     //await Hospital1.deleteMany({name: 'kims'});
     //await Hospital1.deleteMany({name: 'rims'});
    Hospital1.find()
   .then((hospitals)=>{
    console.log(hospitals);
 })
  .catch((err)=>{
    console.log(err);
   }) 
   //console.log(x);
   //console.log(y);
   //console.log(z);
   //console.log(cc);
   return res.status(401).send('<h1 style="color:red;text-align: center;border: 3px solid red;">Invalid Hospital ID or Password</h1>');
  }
  await Hospital1.updateOne({ y }, { cc });
  const result = await Hospital1.findOneAndUpdate(
    { hospitalId: y }, //match the value
    { $set: { cylinderCount: cc } }, // Update the value based on key(cylinderCount)
    { new: true } // Return the updated document
  );
  //await Hospital.updateOne({ k}, { c });
  //console.log(x);
  //console.log(y);
  //console.log(z);
  //console.log(cc);
  Hospital1.find()
   .then((hospitals)=>{
    console.log(hospitals);
 })
  .catch((err)=>{
    console.log(err);
   }) 
  res.send('<h1 style="color:green;text-align: center;border: 3px solid green;"> Cylinder count updated successfully </h1>');
});
app.get('/dr',(req,res)=>{
  res.sendFile(__dirname + "/pro1.html");
});
app.get("/",function(req,res){
   res.sendFile(__dirname+"/pro.html");
});
app.post("/go",function(req,res){
   const x=req.body.city;
   console.log(x);
   Hospital1.find({ location: x }) 
  .then((hospitals) => {
      //results=hospitals;
      //res.render('index', { results });
      hospitals.forEach((hospital) => {
      //console.log(hospital.name);
      //console.log(hospital.location);
      //console.log(hospital.cylinderCount);
      
      
    });
    Hospital1.find({ location: x })
    .then((results) => {
      res.render('index', { results });
    })
    .catch((error) => {
      console.error('Error querying database', error);
      res.sendStatus(500);
    });
   
  })
  .catch((error) => {
    console.error('Error retrieving users:', error);
  });

});
  
app.listen(3000, () => console.log('Server started at http://localhost:3000'));

/*exports.may = function(req,res) {
  Hospital.find({location: x},function(err,docs) {
      res.render('may', {
          "hospitals" : docs

      });
  });
};*/