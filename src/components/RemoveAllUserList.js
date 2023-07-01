import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeAllUserList } from '../utils/APIRoutes';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { toastOptions } from '../utils/ToastOptions';
import Loading from './Loading';

const RemoveAllUserList = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(() => {
        const deleteAll = async() => {
            const { data } = await axios.delete(removeAllUserList); 
            if (data.status === "OK") {
                toast.success(data.msg, toastOptions);
            } else {
                toast.error(data.msg, toastOptions);
            }
        } 
        deleteAll();
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

export default RemoveAllUserList