import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateUserList } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { toastOptions } from '../utils/ToastOptions';
import Loading from './Loading';

const UpdateUserList = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const updateAll = async() => {
            const { data } = await axios.get(updateUserList); 
            if (data.status === "OK") {
                toast.success(data.msg, toastOptions);
            } else {
                toast.error(data.msg, toastOptions);
            }
        } 
        updateAll();
        setIsLoading(false);
        navigate('/');
    }, []);

    return (
        <>
        {isLoading && <Loading />}
        <ToastContainer />
        </>
    )  
}

export default UpdateUserList