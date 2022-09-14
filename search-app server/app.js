const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require('cors')
const AdsModal = require("./Schemas/Ads-Schema")
const CompaniesModal = require("./Schemas/CompaniesSchema")
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const DB = process.env.MONGO_DB
mongoose.connect(DB, ()=>{
    console.log("Successfully connected to database!");
}, (err)=>{
    if(err){
        console.log(err);
    }
})

app.use(express.json({limit:'30mb', extended:true}))
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Listening to server at port 5000");
    }
})

app.get("/", async(req, res)=>{
    const adsData = await AdsModal.find()
    const companyData = await CompaniesModal.find()
    for(let i=0; i<adsData.length; i++){
        let result = companyData.filter((val)=> val._id === adsData[i].companyId)
        Object.assign(adsData[i], {companyData: result})
    }

    res.status(200).send(adsData)
})

app.post("/", async(req, res)=>{
    try{
        const addNewData = new AdsModal(req.body)
        await addNewData.save()
        res.status(200).send("Data Added Successfully!")
    }catch(err){
        res.status(400).send(err)
    }
})

app.post("/companies", async(req, res)=>{
    try{
        await CompaniesModal.insertMany(req.body)
        res.status(200).send("Company Data Added Successfully!")
    }catch(err){
        res.status(400).send(err)
    }
})