const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    id : String, 
    name : String, 
    location : String, 
    age : String, 
    sex : String, 
    pincode : String, 
    address : String, 
    visit_date : Date, 
    phy_id : String, 
    phy_name : String, 
    room_no : String, 
    phone : String, 
    email : String, 
    aud : String, 
    jti : String, 
  },
  {
    collection: "patient",
  }
);

const model = mongoose.model("Patient", patientSchema);

module.exports = model;
