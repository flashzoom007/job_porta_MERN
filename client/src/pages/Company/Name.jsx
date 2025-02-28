import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAllCompany, deleteCompany, deleteAllCompanys } from '../Apis/CommonApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";

const Name = () => {
    const navigate = useNavigate();
    const [companyShow, setCompanyShow] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
        navigate(0);
    };

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

    useEffect(() => {
        getAllCompany(setCompanyShow, setShowModal);
    }, [refresh]);

    const onSubmit = async (data) => {
        try {
            let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-company`;
            let payload = { name: data.name };

            if (isEditMode && selectedCompany) {
                apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-company`;
                payload.id = selectedCompany.id;
            }
            console.log('apiUrl', apiUrl);
            const response = await axios.post(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
                closeModal();
                handleRefresh();
            } else if (response.data.statusCode === 100) {
                toast.info(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
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
            await deleteCompany(companyId);
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
                        deleteAllCompanys();
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="input-group">
                                        <input
                                            type="text" required
                                            {...register('name', { required: true })}
                                        />
                                        <label >Company Name</label>
                                        {errors.name && <p className="text-danger">Company name is required.</p>}
                                    </div>

                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="submit" className="btn btn-outline-success">
                                            {isEditMode ? 'Update' : 'Add'}
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={closeModal}> Close </button>
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
                            <th>Create Job</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyShow.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.name}</td>
                                <td><button className="btn btn-outline-info"><IoIosCreate /></button></td>
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

export default Name;  