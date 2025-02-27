import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAllApplyForJob, deleteApplyForJob, deleteAllApplyForJob, getAllCompany,getAllJobPosition } from '../Apis/CommonApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";

const ApplyForJob = () => {
    const navigate = useNavigate();
    const [companyShow, setCompanyShow] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
        navigate(0);
    };

    useEffect(() => {
        getAllCompany(setCompanyOptions);
        getAllJobPosition(setPositionOptions);
    }, [refresh]);


    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    useEffect(() => {
        getAllApplyForJob(setCompanyShow, setShowModal);
    }, [refresh]);

    const onSubmit = async (data) => {
        try {
            let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-apply-for-job`;

            if (isEditMode && selectedCompany) {
                apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-apply-for-job`;
                payload.id = selectedCompany.id;
            }

            // Correct payload with all required fields
            let payload = {
                id: data.id,  // Ensure ID is set correctly
                company_name: data.company_name,
                user_name: data.user_name,
                position_name: data.position_name,

                resume: data.resume || "NA",  // Default to "NA" if empty
            };

            console.log('Submitting to API:', apiUrl, payload);

            const response = await axios.post(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
                closeModal();  // Close the modal on success
                handleRefresh();  // Refresh the UI if needed
            } else if (response.data.statusCode === 400) {
                toast.warning(response.data.message);
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error in job application:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };


    const handleEdit = (company) => {
        setSelectedCompany(company);
        setIsEditMode(true);
        setShowModal(true);
        setValue('name', company.name);
    };

    const handleDelete = async (companyId) => {
        try {
            await deleteApplyForJob(companyId);
            toast.success("Company deleted successfully.");
            handleRefresh();
        } catch (error) {
            toast.error("Failed to delete company.");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompany(null);
        setIsEditMode(false);
        reset();
    };

    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center my-3'>
                <button
                    onClick={() => {
                        setShowModal(true);
                        setIsEditMode(false);
                        reset();
                    }}
                    className="btn btn-outline-primary mb-3"
                >
                    Add New <FaAngleRight />
                </button>
                <button
                    onClick={() => {
                        deleteAllApplyForJob();
                    }}
                    className="btn btn-outline-danger mb-3"
                >
                    Delete All
                </button>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditMode ? 'Edit Company' : 'Add Company'}</h5>
                                <button className="btn-outline-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm">
                                    <h3 className="mb-3">{isEditMode ? "Edit Job Application" : "Apply for a Job"}</h3>

                                    {/* Company Name */}
                                    <div className="mb-3">
                                        <label className="form-label">  Name</label>
                                        <select className="form-control" {...register('name', { required: true })}>
                                            <option value="">Select a company</option>
                                            {companyOptions.map((company) => (
                                                <option key={company.id} value={company.name}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.name && <p className="text-danger">Company name is required.</p>}
                                    </div>

                                    {/* User Name */}
                                    <div className="mb-3">
                                        <label className="form-label">Your Name</label>
                                        <input
                                            className="form-control"
                                            {...register("user_name", { required: true })}
                                        />
                                        {errors.user_name && <p className="text-danger">Your name is required.</p>}
                                    </div>

                                    {/* Position Name */}                               
                                    <div className="mb-3">
                                        <label className="form-label">  Name</label>
                                        <select className="form-control" {...register('name', { required: true })}>
                                            <option value="">Select a Position</option>
                                            {positionOptions.map((position) => (
                                                <option key={position.id} value={position.name}>
                                                    {position.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.name && <p className="text-danger">Position is required.</p>}
                                    </div>

                                    {/* Resume */}
                                    <div className="mb-3">
                                        <label className="form-label">Resume (Link or "NA")</label>
                                        <input
                                            className="form-control"
                                            {...register("resume", { required: true })}
                                        />
                                        {errors.resume && <p className="text-danger">Resume is required.</p>}
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="submit" className="btn btn-outline-success">
                                            {isEditMode ? "Update" : "Apply"}
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered border-dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Resume</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyShow.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.user_name}</td>
                                <td>{company.company_name}</td>
                                <td>{company.position_name}</td>
                                <td>{company.resume}</td>
                                <td> <button className="btn btn-outline-primary" onClick={() => handleEdit(company)}> <FaEdit /> </button> </td>
                                <td> <button className="btn btn-outline-danger" onClick={() => handleDelete(company.id)} > <FaTrash /> </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default ApplyForJob