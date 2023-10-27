import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "./Sidebar";
import { dateType } from "./types";
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { parseISO } from 'date-fns'; // Import the parseISO function


const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


function Search() {
    const [loading, setLoading] = useState(false);

    const[searchText, setSearchText] = useState('');

    const [data, setData] = useState<dateType>({
        id: '',
        name: '',
        location: '',
        age: '',
        sex: '',
        pincode: '',
        address: '',
        visit_date: '',
        phy_id: '',
        phy_name: '',
        phone: '',
        email: '',
        aud: '',
        jti: ''
      })

      const handleChange = (key: any, value: any ) => {
        if(key == 'visit_date'){
            setData((prevData) => ({
                ...prevData,
                [key]: parseISO(value),
              }));
        }
        else{
            setData((prevData) => ({
                ...prevData,
                [key]: value,
              }));
        }
      };

      const setDataOnPage = (data: { [key: string]: string }) => {
        setLoading(true);
        
        console.log(data)
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key]
                handleChange(key, value)
            }
        }

        setLoading(false);
      }
      

      const getData = async () => {
        const req = await fetch(`${REACT_APP_BASE_URL}/api/search`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "searchText": searchText,
            },
        });
        const response = await req.json();
        console.log(response);

        setDataOnPage(response.data);

        if (response.status !== "ok") {
            alert(response.error);
        }
    };

    const findpatient = () => {
        getData();
      };

      useEffect(() => {
        if(searchText !== ''){
            console.log(searchText)
        }
      },[searchText])

  return (
    <div className="outerBox">
        <div className="glassDesign">
        {!loading && (
            <div className="box">
                <div>
                    <Sidebar/>
                </div>
                <div className="vertical"></div>

                <div className="formcolumn">
                    <form className="loginForm">
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Search Patient by First Name, Last Name, Phone, E-mail, Location, Address</FormLabel>
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <TextField
                                    sx={{ width: '600px', marginRight: "50px"}}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <Button
                                        onClick={findpatient}
                                        >Find</Button>
                                </div>
                            </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Patient ID</FormLabel>
                                <TextField InputProps={{ readOnly: true }} value={data.id} />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Patient Name (First, Last Name)</FormLabel>
                                <TextField  InputProps={{ readOnly: true }} value={data.name} />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Location</FormLabel>
                                <TextField  InputProps={{ readOnly: true }} value={data.location} />
                            </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Age</FormLabel>
                                <TextField InputProps={{ readOnly: true }} value={data.age} />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Sex</FormLabel>
                                <TextField InputProps={{ readOnly: true }} value={data.sex} />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Pincode</FormLabel>
                                <TextField  InputProps={{ readOnly: true }} value={data.pincode}/>
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Address</FormLabel>
                                <TextField  InputProps={{ readOnly: true }} value={data.address} />
                            </div>
                        </div>
                        <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>

                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Physician ID</FormLabel>
                                <TextField sx={{ width: '300px' }} InputProps={{ readOnly: true }} value={data.phy_id}/>
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Physician Name (First, Last Name)</FormLabel>
                                <TextField  sx={{ width: '300px' }} InputProps={{ readOnly: true }} value={data.phy_name}/>
                            </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Phone</FormLabel>
                                <TextField InputProps={{ readOnly: true }} value={data.phone}/>
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Visit Date</FormLabel>
                                <DatePicker
                                selected={ (typeof data.visit_date == 'string' ) ? null : data.visit_date}
                                onChange={() => {}}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                showTimeSelect
                                timeFormat="HH:mm:ss"
                                timeIntervals={1}
                                timeCaption="Time"
                                disabled
                                />
                            </div>
                        </div>
                        <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>

                    </form>
                    </div>
            </div>
            )}
        </div>
    </div>


  )
}

export default Search