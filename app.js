console.log("This is Dance Website");

const express =require ("express");
const app = express();
const path= require('path');
const mongoose =require('mongoose');
const bodyparser = require("body-parser");//in this case body-parser is not nesseciry

//body-parser

//mongoose
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = 5000;

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
        name: String,
        age: String,
        gender: String,
        email: String,
        address: String,
        mobile: String,
        more: String
      });


const contact = mongoose.model('Kitten', contactSchema);

// EXPRESS SPECIFIC STUF
app.use("/static",express.static("static"));
app.use(express.urlencoded());

// PUG SPECIFIC STUF
app.set('view engine', 'pug');
app.set ('views', path.join(__dirname,'views')); 

// app.use(express.json());
// app.use(express.urlencoded({extended:false}));


//END POINT
app.get("/",(req, res)=>{
        const params ={}
        res.status(200).render("home.pug", params);
})
app.get("/contact",(req, res)=>{
        const params ={}
        res.status(200).render("contact.pug", params);
})

//this is from v-88
app.post("/contact", (req, res)=>{
        var myData = new contact(req.body);
        myData.save().then(()=>{
                res.send("This item has been saved to the database")
        }).catch(()=>{
                res.status(400).send("Item was not saved to the database")
        });
        
        //res.status(200).render("contact.pug");
})
//or
// app.post('/contact', async (req, res) =>{
//         try {
//             const registerEmployee = new contact({
//                 name:req.body.name,
//                 age:req.body.age,
//                 gender: req.body.gender,
//                 email: req.body.email,
//                 address: req.body.address,
//                 mobile: req.body.mobile,
//                 more: req.body.more
                
//             })
//             const registered = await registerEmployee.save();
//             res.status(201).render("index");
//             // console.log(req.body.name);
//             // res.send(req.body.name);
//         } catch (error) {
//             res.status(400).send(error);
//         }
//     })




//START THE SERVER 
app.listen(port,()=>{
  console.log(`The server successfully run at port ${port} `);
});
