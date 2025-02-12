import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAllCompany, deleteCompany } from '../Apis/CommonApi';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Name = () => {
    const [companyShow, setCompanyShow] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        getAllCompany(setCompanyShow);
    }, [refresh]);

    const onSubmit = async (data) => {
        try {
            let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-company`;
            let method = 'POST';

            if (isEditMode && selectedCompany) {
                apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-company/${selectedCompany.id}`;
                method = 'PUT';
            }

            const response = await axios({
                method: method,
                url: apiUrl,
                data: { name: data.name },
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
                closeModal();
                setRefresh(prev => !prev);
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

    const closeModal = () => {
        setShowModal(false);
        setSelectedCompany(null);
        setIsEditMode(false);
        reset();
    };

    return (
        <div className="container">
            <button
                onClick={() => {
                    setShowModal(true);
                    setIsEditMode(false);
                    reset();
                }}
                className="btn btn-primary mb-3"
            >
                Add Company
            </button>

            {showModal && (
                <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditMode ? 'Edit Company' : 'Add Company'}</h5>
                                <button className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label className="form-label">Company Name</label>
                                        <input
                                            className="form-control"
                                            {...register('name', { required: true })}
                                        />
                                        {errors.name && <p className="text-danger">Company name is required.</p>}
                                    </div>
                                    <div className="d-flex justify-content-end gap-2">
                                        <button type="submit" className="btn btn-success">
                                            {isEditMode ? 'Update' : 'Add'}
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={closeModal}> Close </button>
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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyShow.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.name}</td>
                                <td> <button className="btn btn-outline-primary" onClick={() => handleEdit(company)}> <FaEdit /> </button> </td>
                                <td> <button className="btn btn-outline-danger" onClick={() => deleteCompany(company.id)} > <FaTrash /> </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Name;
