const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required :true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
//const Register = new mongoose.model('Register', userSchema);
module.exports = mongoose.model('Register', userSchema);;