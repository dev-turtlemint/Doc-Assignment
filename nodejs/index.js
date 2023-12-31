const express = require("express");
const { google } = require('googleapis');

const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 1337;


app.use(cors());
app.use(express.json());


// ExcelSheet

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT, OAuth2 } = require('google-auth-library');
const { doctorNames, roomData } = require("./data");

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);



(async function() {
    await serviceAccountAuth;
    await doc.loadInfo(); // loads document properties and worksheets
    // await doc.updateProperties({ title: 'Assignment' });

}());


// MongoDB

const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Patient = require("./models/patient.model.js");

//to remove warning the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });


app.post("/api/add", async (req, res) => {
  try {
    const id = req.body.data.id;
    const name = req.body.data.name;
    const location = req.body.data.location;
    const age = req.body.data.age;
    const sex = req.body.data.sex;
    const pincode = req.body.data.pincode;
    const address = req.body.data.address;
    const visit_date = req.body.data.visit_date;
    const phy_id = req.body.data.phy_id;
    const phy_name = req.body.data.phy_name;
    const room_no = req.body.data.room_no;
    const phone = req.body.data.phone;
    const email = req.body.data.email;
    const aud = req.body.data.aud;
    const jti = req.body.data.jti;


    

    // console.log(next_visit, 'working')

    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    let rows = await sheet.getRows();
    maxid = 1.0
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        // console.log(rows[index], 'working')
        if (phone == row._rawData[11]) {
            // console.log(index)
            
            await rows[index].delete(); // delete a row
            break;
        }
    };

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if(Number(row._rawData[0]) > maxid){
            maxid = Number(row._rawData[0])
        }
    };

    const user = await Patient.findOneAndDelete({
      email: email,
      phone: phone,
    });

    // Putting data in mongoDB
    const record = {
      id: (maxid + 1.0),
      name: name,
      location: location,
      age: age,
      sex: sex, 
      pincode: pincode, 
      address: address,
      visit_date: visit_date,
      phy_id: phy_id,
      phy_name: phy_name,
      room_no: room_no,
      phone: phone,
      email: email,
      aud: aud,
      jti: jti
    };
    const response = await Patient.create(record);



    const addnewrow = await sheet.addRow({
            id: (maxid + 1.0),
            name: name,
            location: location,
            age: age,
            sex: sex, 
            pincode: pincode, 
            address: address,
            visit_date: visit_date,
            phy_id: phy_id,
            phy_name: phy_name,
            room_no: room_no,
            phone: phone,
            email: email,
            aud: aud,
            jti: jti
        });

    // console.log(addnewrow)

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      error: "Something went wrong, try again later!",
    });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const searchtext = req.headers.searchtext;
    // console.log(req.headers.searchtext)
    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();
    reqrow = -1
    finalans = {}
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        for (const value of row._rawData) {
            if (value.includes(searchtext)) {
                for (let i = 0; i < row._rawData.length; i++) {
                    finalans[row._worksheet._headerValues[i]] = row._rawData[i];
                }
                reqrow = 1;
                break;
            }
        }
    };



    if(reqrow == -1){
        res.json({
            status: "error",
            error: "Patient not found!"
        })
    }
    else {
        res.json({
            status: "ok",
            data: finalans,
        })
    }

    return res;
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Data not found!" });
  }
});

app.get("/api/clinic-data", async (req, res) => {
  try {

    const doctors = doctorNames;
    const rooms = roomData;

    const clinicdata = {
      doctors: doctors,
      rooms: rooms
    }
    res.json({
      status: "ok",
      data: clinicdata,
    })

    return res;
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Data not found!" });
  }
});

app.post("/api/update", async (req, res) => {
    try {
  
    //   const isPasswordValid = await bcrypt.compare(
    //     req.body.password,
    //     user.password
    //   );
    const searchText = req.headers["searchText"];
    await serviceAccountAuth.authorize();

    const sheet = doc.sheetsByIndex[0];
    
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === oldValue) {
            rows[index][keyValue] = newValue;
            await rows[index].save();
            break; 
        }
    };
      
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/del", async (req, res) => {
    try {
      const id = req.body.data.id;
      const name = req.body.data.name;
      const location = req.body.data.location;
      const age = req.body.data.age;
      const sex = req.body.data.sex;
      const pincode = req.body.data.pincode;
      const address = req.body.data.address;
      const visit_date = req.body.data.visit_date;
      const phy_id = req.body.data.phy_id;
      const phy_name = req.body.data.phy_name;
      const phone = req.body.data.phone;
      const email = req.body.data.email;
      const aud = req.body.data.aud;
      const jti = req.body.data.jti;
      // console.log(next_visit, 'working')
  
      await serviceAccountAuth.authorize();
  
      const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  
      let rows = await sheet.getRows();
      maxid = 1.0
      for (let index = 0; index < rows.length; index++) {
          const row = rows[index];
          console.log(row._rowNumber, phone, row._rawData[11], 'working')
          if (phone == row._rawData[11]) {
              // console.log(index)
              await row.delete(); // delete a row
              break;
          }
      };

      const user = await Patient.findOneAndDelete({
        email: email,
        phone: phone,
      });
  
      res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        error: "Record not found!",
      });
    }
  });

app.listen(1337, () => {
  console.log("Server has started on 1337");
});


// app.post("/api/register", async (req, res) => {
//   try {
//     const newPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: newPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Duplicate email" });
//   }
// });




// https://www.googleapis.com/auth/drive.appdata
// https://www.googleapis.com/auth/drive.appfolder	
// https://www.googleapis.com/auth/drive.install	
// https://www.googleapis.com/auth/drive.file
// https://www.googleapis.com/auth/drive.resource