import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getAllCompanyProfile, deleteCompanyProfile, getAllCompany, handleFileChange, handleUpload } from '../Apis/CommonApi';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Profile = () => {
    const [companyShow, setCompanyShow] = useState([]);
    const [companyOptions, setCompanyOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    // const [selectedFile, setSelectedFile] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        getAllCompanyProfile(setCompanyShow, setShowModal);
        getAllCompany(setCompanyOptions);
    }, [refresh]);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    const onSubmit = async (data) => {
        const uploadFileName = await handleUpload();
        if (!uploadFileName) {
            return null;
        }
        try {
            let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-company-profile`;
            let payload = {
                name: data.name,
                description: data.description,
                url: data.url,
                // image: data.image
                /* image: selectedFile ? selectedFile.name : data.image, */
                image: uploadFileName
            };

            if (isEditMode && selectedCompany) {
                apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-company-profile`;
                payload.id = selectedCompany.id;
            }

            const response = await axios.post(apiUrl, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.statusCode === 200) {
                toast.success(response.data.message);
                closeModal();
                handleRefresh();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleEdit = (company) => {
        setSelectedCompany(company);
        setIsEditMode(true);
        setShowModal(true);
        setValue('name', company.name);
        setValue('description', company.description);
        setValue('url', company.url);
        setValue('image', company.image);
    };

    const handleDelete = async (companyId) => {
        try {
            await deleteCompanyProfile(companyId);
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

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setSelectedFile(file); // Store the selected file in state
    // };

    return (
        <div className="container">
            <button
                onClick={() => {
                    setShowModal(true);
                    setIsEditMode(false);
                    reset();
                }}
                className="btn btn-outline-primary mb-3"
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

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-control" {...register('description', { required: true })} />
                                        {errors.description && <p className="text-danger">Description is required.</p>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Website URL</label>
                                        <input className="form-control" {...register('url', { required: true })} />
                                        {errors.url && <p className="text-danger">URL is required.</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Upload Photo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('photos',
                                                // { required: true }
                                            )}
                                            className={`form-control ${errors.photos ? 'is-invalid' : ''}`}
                                            onChange={handleFileChange}
                                        />
                                        {errors.photos && (
                                            <div className="invalid-feedback">Upload the photo</div>
                                        )}
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
                            <th>Description</th>
                            <th>URL</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyShow.map((company, index) => (
                            <tr key={company.id}>
                                <td>{index + 1}</td>
                                <td>{company.name}</td>
                                <td>{company.description}</td>
                                <td><a href={company.url} target='_blank' rel="noopener noreferrer">{company.url}</a></td>                              
                                <td>
                                    <img
                                        src={`${import.meta.env.VITE_FRONTEND_URL}/upload/${company.image}`} // Use relative path
                                        alt="Company"
                                        width="50"
                                        height="50"
                                    />

                                </td>
                                <td>
                                    <button className="btn btn-outline-primary" onClick={() => handleEdit(company)}>
                                        <FaEdit />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(company.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;
