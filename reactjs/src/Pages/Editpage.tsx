import { Button, FormLabel, IconButton, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "./Sidebar";
import DatePicker  from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { dateType } from "./types";
import { parseISO } from 'date-fns'; // Import the parseISO function


const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


function Editpage() {
    const [doctorsList, setDoctorsList] = useState([]);
    const [roomlist, setRoomList] = useState([]);


    const navigate = useNavigate();

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
        room_no: '',
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

      const handleChangedatepicker = (key: any, value: any ) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
            }));
      };

      const findpatient = () => {
        getData();
      };

    //   const token = req.headers["x-access-token"];

      const setDataOnPage = (data: any) => {
        setLoading(true);
        
        for(const key in data){
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key]
                handleChange(key, value)
            }
        }

        setLoading(false);
      }
      

      const handleSubmitDetails = async (e: any) => {
        e.preventDefault();
    
        const req = await fetch(`${REACT_APP_BASE_URL}/api/add`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            // "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                data: data,
            }),
        });
        const response = await req.json();
        if (response.status === "ok") {
            alert("Appointment edited Successfully!");
        } else {
            alert(response.error);
        }
      };

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


      useEffect(() => {
        if(searchText !== ''){
            console.log(searchText)
        }
      },[searchText])

      const updateClinicData = async () => {
        const req = await fetch(`${REACT_APP_BASE_URL}/api/clinic-data`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            // "x-access-token": localStorage.getItem("token"),
            }
        });
        const response = await req.json();
        if (response.status === "ok") {
            // alert("Data added Successfully!");
            setDoctorsList(response.data.doctors)
            setRoomList(response.data.rooms)

            // handleChange('visit_date', response.doctors)
            console.log(response)
        } else {
            alert(response.error);
        }
      };

      useEffect(() => {
        updateClinicData();
      }, [])

    async function delappointment() {
    
        const req = await fetch(`${REACT_APP_BASE_URL}/api/del`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            // "x-access-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({
                data: data,
            }),
        });
        const response = await req.json();
        if (response.status === "ok") {
            alert("Appointment deleted Successfully!");
            navigate('/search');
            // setDataOnPage(data);
        } else {
            alert(response.error);
        }
    }

  return(
    <div className="outerBox">
        <div className="glassDesign">
        {!loading && (
            <div className="box">
                <div>
                    <Sidebar/>
                </div>
                <div className="vertical"></div>
                <div className="flex-center-hor">
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
                                    style={{fontSize: "medium"}}
                                    >Find</Button>
                                    <Button
                                    style={{fontSize: "medium"}}
                                    onClick={delappointment}
                                    >Delete</Button>
                                </div>
                                
                            </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Patient ID</FormLabel>
                                <TextField
                                defaultValue={"Auto Generated"}
                                // value={data.id}
                                // onChange={(e) => handleChange('id', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Patient Name (First, Last Name)</FormLabel>
                                <TextField
                                value={data.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Location</FormLabel>
                                <TextField
                                value={data.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Age</FormLabel>
                                <TextField
                                value={data.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Sex</FormLabel>
                                <TextField
                                value={data.sex}
                                onChange={(e) => handleChange('sex', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Pincode</FormLabel>
                                <TextField
                                value={data.pincode}
                                onChange={(e) => handleChange('pincode', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Address</FormLabel>
                                <TextField
                                value={data.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                />
                            </div>
                        </div>
                        <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>

                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Physician ID</FormLabel>
                                <TextField
                                sx={{ width: '300px' }}
                                value={data.phy_id}
                                onChange={(e) => handleChange('phy_id', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Physician Name (First, Last Name)</FormLabel>
                                <Select
                                    sx={{ width: '300px' }}
                                    labelId="phy_name"
                                    id="phy_name"
                                    value={data.phy_name}
                                    label="Age"
                                    onChange={(e: any) => handleChange('phy_name', e.target.value)}
                                >   {
                                        doctorsList.map((value, index) => (
                                            <MenuItem key={index} value={value}>{value}</MenuItem>
                                        ))
                                    }
                                </Select>
                                {/* <TextField
                                sx={{ width: '300px' }}
                                value={data.phy_name}
                                onChange={(e) => handleChange('phy_name', e.target.value)}
                                /> */}
                            </div>
                            <div className="inputgroup">
                            <FormLabel>Room No</FormLabel>
                            <Select
                                sx={{ width: '150px' }}
                                labelId="room_no"
                                id="room_no"
                                value={data.room_no}
                                label="Age"
                                onChange={(e: any) => handleChange('room_no', e.target.value)}
                            >   {
                                    roomlist.map((value, index) => (
                                        <MenuItem key={index} value={value}>{value}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        </div>
                        <div className="inputrow">
                            <div className="inputgroup">
                                <FormLabel>Phone</FormLabel>
                                <TextField
                                value={data.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>
                            <div className="inputgroup">
                                <FormLabel>Visit Date</FormLabel>
                                <DatePicker
                                selected={ (typeof data.visit_date == 'string' ) ? null : data.visit_date}
                                placeholderText={"Select Date"}
                                onChange={(e) => handleChangedatepicker('visit_date', e)} 
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                showTimeSelect
                                timeFormat="HH:mm:ss"
                                timeIntervals={60}
                                timeCaption="Time"
                                isClearable
                                className="custom-datepicker"
                                />
                            </div>
                        </div>
                        <hr style={{color: "lightgray", backgroundColor: "gray", border: "none", height: "5px", marginTop: "20px", marginRight: "50px"}}/>
                    </form>
                    <div style={{justifySelf: "center", alignSelf: "center"}}>
                        <Button 
                        style={{fontSize: "medium"}}
                        onClick = {e => handleSubmitDetails(e)}
                        >
                        Submit
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
);
}

export default Editpage

