const mongoose = require("mongoose")


const adsSchema = new mongoose.Schema({
    companyId : {
        type : Number,
        required : true
    },
    primaryText : {
        type : String,
        required : true
    },
    headline : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    CTA : {
        type : String,
        required : true
    },
    imageURL : {
        type : String,
        required : true
    },
    companyData : {
        type : Object
    }
})

const AdsModal = mongoose.model("Ads",adsSchema);

module.exports = AdsModal;
