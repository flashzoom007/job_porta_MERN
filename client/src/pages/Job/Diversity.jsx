
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaAngleLeft } from "react-icons/fa";

const Diversity = ({setTabIndex}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    return (
        <>
      
                <form>
                    <div className="">
                        <label>Diversity:</label>
                        <input type="text" {...register('jobName', { required: true })} />
                    </div>
                    <button className="btn btn-outline-primary link-hover mt-3" onClick={() => setTabIndex(1)}>  <FaAngleLeft /> Previous </button>      
                </form>
          
        </>
    )
}

export default Diversity