import { Button, FormLabel, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin, hasGrantedAllScopesGoogle, TokenResponse, CodeResponse } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setAud, setJti} from '../actions';







function Select() {
    const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const [loggedIn, setloggedIn] = useState(false)

    const dispatch = useDispatch();
    const state: any = useSelector((state) => state);
    // console.log(state)

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        if(state.user['email'] != ''){
            setloggedIn(true)
            alert(`Logged in as ${state?.user['email']}`)
        }
    },[state])

  return (
    <div className="outerBox">
        <div className="glassDesign">
        {loading && (
            <div style={{ display: "flex", flexDirection: "row", width: '80vw', height: '85vh'}}>
                <div style={{minWidth: "12vw"}}>
                    <Sidebar/>
                </div>
                <div className="vertical"></div>
                <div className='flex-center'>
                        <div>
                        <GoogleOAuthProvider clientId={`${REACT_APP_CLIENT_ID}`}>
                            <GoogleLogin

                                onSuccess={(  credentialResponse: any) => {
                                // onSuccess={(  response: TokenResponse|CodeResponse|any) => {
                                const credential: any = jwt_decode(credentialResponse.credential);
                                // console.log(credential);

                                dispatch(setEmail(credential.email));
                                dispatch(setAud(credential.aud));
                                dispatch(setJti(credential.jti));
                                }}
                                onError={() => {
                                console.log('Login Failed');
                                }}
                                
                            />
                            
                        </GoogleOAuthProvider>
                        
                        </div>
                </div>  
                </div>
            )}
        </div>
    </div>
  )
}

export default Select