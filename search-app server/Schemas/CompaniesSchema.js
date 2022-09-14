const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    _id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    url :{
        type : String,
        required : true
    }
})

const CompaniesModal = mongoose.model("Companies", CompanySchema)

module.exports = CompaniesModal