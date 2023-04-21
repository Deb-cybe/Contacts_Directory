const mongoose=require('mongoose');

const PeopleSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    callby:{
        type:Number,
        required:true
    },
    livein:{
        type:String,
        required:true,
    }
});

const PeopleModel=mongoose.model("people",PeopleSchema);

module.exports=PeopleModel;