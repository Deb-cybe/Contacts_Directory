const express=require('express');
const app=express();
const mongoose = require('mongoose');
const PeopleModel=require('./models/People');
const cors=require('cors');
require('dotenv').config({path:__dirname+'./.env'});

//  console.log(process.env.MONGO_URI);
//  console.log(require('dotenv').config().parsed.MONGO_URI);
let port=process.env.PORT || 28345;
main().catch(err => console.log(err));
app.use(express.json());
app.use(cors());

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/contacts');
  await mongoose.connect(require('dotenv').config().parsed.MONGO_URI);
  await console.log("connection successfull");
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.post('/insert',async (req,res)=>{
    const people=new PeopleModel(req.body);
    try{
        const newPeople=await people.save();
        res.status(201).json({newPeople});
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.get('/readData',async(req,res)=>{
    
    try{
        const userData=await PeopleModel.find();
        res.send(userData);
    }
    catch(err){
     res.send(err);       
    }
});
app.put('/update/:id',async(req,res)=>{
    const data=req.body; 
    const id=req.params.id;
    try {
        const updated=await PeopleModel.findByIdAndUpdate(id,data);    
        res.send('/');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
app.delete('/delete/:id',async(req,res)=>{
    let id = req.params.id; 
    try {
        const deleted=await PeopleModel.findByIdAndDelete(id);        
        if(!id){
            res.status(400).send('invalid id');
        }
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port,()=>{
    console.log('connected succesfully');
});

 