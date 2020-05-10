const express = require("express")
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

const app = express()

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

var  userschema = new mongoose.Schema({
  sname: String,
  semail: String,
  sphone: Number
});

var user = mongoose.model("user", userschema);

app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
});

app.get('/userdetails',function(req,res){
  user.find({},function(err,arrayname){
    if(err) console.log("error occured");
    res.render("userdetails.ejs",{arrayname:arrayname})
    
  })
});

app.get('/index',function(req,res){
  res.render("index.html");
});

app.post('./signup', function(req,res){ 
    var name = req.body.name; 
    var email = req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 


    const schema = {
        name: Joi.string().required()
        email: Joi.mail().required()
        phone: Joi.number().required()
    };

    const result = Joi.validate  (req.body, schema);
    if (result.error){
        res.status(400)
        return;
    }
    else{
        var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    }}

 db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup.html'); 
}) 
  
  


app.listen(3030, () => console.log("Listing in the port 3030"));