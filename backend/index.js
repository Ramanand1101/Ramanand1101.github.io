const express=require("express")
const nodemailer=require("nodemailer")
const bodyparser=require("body-parser")
const path = require('path');
require('dotenv').config()
const app=express()

app.use(express.static(path.join(__dirname, '../Frontend')));



app.use(bodyparser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});


app.post("/",async(req,res)=>{
    const name=req.body.Name;
    const email=req.body.Email
    const message=req.body.Message;
    const transporter= await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.User,
            pass:process.env.Pass
        }
    })
    var mailOptions={
        from:process.env.User,
        to:req.body.Email,
        cc:process.env.User,
        subject:"New User Contact Me Name-"+name,
        text:message,
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log("email Sent"+info.response)
            res.redirect("/")
        }
    })
})





app.listen(process.env.port,()=>{
    console.log(`Server running in ${process.env.port}`)
})