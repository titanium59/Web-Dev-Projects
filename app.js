const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const Register = require('./models/user')

mongoose.connect('mongodb://127.0.0.1:27017/userRegistration',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("database connected");
});

app.use(express.urlencoded({extended: true}))


app.set('view engine', 'ejs');
app.set('views',path.join (__dirname,'views'));

app.get('/' ,(req,res) =>{
    res.render('index')
})
app.get('/register' , (req,res) =>{
    res.render('register.ejs');
})
app.post('/register' , async(req,res) => {
    try {
        const x = req.body;
        const newUser = new Register({
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email,
            phone: x.phone,
            age: x.age,
            password: x.password
        })
        const saved = await newUser.save();
        res.status(200).redirect('/');
    } catch (error) {
        console.log(error);
    }
})
app.get('/login' , (req,res) => {
    res.render('login.ejs')
})
app.post('/login' , async(req,res)=>{
    const x = req.body.email;
    const user = await Register.findOne({'email': x});
    if(user.password == req.body.password){
        res.send("successfully logged in")
    }
    else{
        res.send("something went wrong")
    }
})
app.listen(3000,() => {
    console.log('serving on port 3000')
})