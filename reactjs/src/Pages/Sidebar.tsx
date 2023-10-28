import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCurPage } from '../actions';
import "../App.css";



const Sidebar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const state: any = useSelector((state) => state);
    
    const [currentPage, setCurrentPage] = useState('');

    useEffect(() => {
      setCurrentPage(state.user.cur_page);
    }, [state]);

  return (
    <div className='pagecolumn'>
        <div className='pink bold'>
        <Button 
        sx={currentPage === 'add' ? { fontWeight: 'bold', fontSize: "medium" } : { fontSize: "medium" }}        
        onClick={() => {navigate('/add'); dispatch(setCurPage('add'));}}>
        Book Appointment
        </Button>
        </div>
        <Button
        sx={currentPage === 'edit' ? { fontWeight: 'bold', fontSize: "medium"  } : {fontSize: "medium" }}  
        onClick={() => {navigate('/edit'); dispatch(setCurPage('edit'));}}>
        Edit Appointment
        </Button>
        <Button 
        sx={currentPage === 'search' ? { fontWeight: 'bold', fontSize: "medium"  } : {fontSize: "medium" }}  
        onClick={() => {navigate('/search'); dispatch(setCurPage('search'));}}>
        Search
        </Button>
        <Button 
        sx={currentPage === 'select' ? { fontWeight: 'bold', fontSize: "medium"  } : {fontSize: "medium" }}  
        onClick={() => {navigate('/select'); dispatch(setCurPage('select'));} }>
        Login
        </Button>
    </div>
  )
}

export default Sidebar