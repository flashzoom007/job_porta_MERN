import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCompany, getAllJobPosition } from '../Apis/CommonApi';

const ApplyForJobPopup = ({ onSubmit, isEditMode, closeModal, selectedJob }) => {
    const { register, watch, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [companies, setCompanies] = useState([]);
    const [positions, setPositions] = useState([]);
    const [companyOptions, setcompanyOptions] = useState([]);
    const [positionOptions, setpositionOptions] = useState([]);

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (isEditMode && selectedJob) {
            Object.keys(selectedJob).forEach((key) => {
                setValue(key, selectedJob[key]);
            });
        } else {
            reset();
        }

        getAllCompany((data) => {
            setcompanyOptions(data);
            setCompanies(data);
        });
        getAllJobPosition((data) => {
            setpositionOptions(data);
            setPositions(data);
        });
    }, [isEditMode, selectedJob, setValue, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm">
            <h3 className="mb-3">Apply for a Job</h3>

            {/* Company Name */}
            <div className="mb-3">
                <label>Company Name</label>
                <select
                    className="form-select"
                    {...register("company_name", { required: "Company Name is required." })}
                    value={watch("company_name", selectedJob?.company_name || "")}
                >
                    <option value="">Select Company</option>
                    {companies.map((props) => (
                        <option key={props.id} value={props.name}>
                            {props.name}
                        </option>
                    ))}
                </select>
                {errors.name && <p className="text-danger">Company name is required.</p>}
            </div>

            {/* User Name */}
            <div className="input-group">
                <input
                    required
                    value={userName || ''}
                    {...register("user_name", { required: true })}
                />
                <label>Your Name</label>
                {errors.user_name && <p className="text-danger">Your name is required.</p>}
            </div>

            <div className="input-group">

                <input
                    required
                    readOnly
                    value={userEmail}
                    {...register("user_email", { required: true })}
                />
                <label>Email</label>
                {errors.user_email && <p className="text-danger">Your Email is required.</p>}
            </div>

            {/* Position Name */}
            <div className="mb-3">
                <label >Position</label>
                <select
                    className="form-select"
                    {...register('role', { required: 'Job Type is required.' })}
                    value={watch("role", selectedJob?.role || "")}
                >
                    <option value="">Select Job Type</option>
                    {positions.map((props) => (
                        <option key={props.id} value={props.name}>{props.name}</option>
                    ))}
                </select>
                {errors.name && <p className="text-danger">Position is required.</p>}
            </div>

            {/* Resume Upload */}
            <div className="mb-3">
                <label>Upload Resume</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register('resume', { required: 'Resume is required.' })}
                    className="form-control"
                />
            </div>


            {errors.photos && (
                <div className="invalid-feedback">Upload the photo</div>
            )}
            {/* Buttons */}
            <div className="d-flex justify-content-end gap-2">
                <button type="submit" className="btn btn-outline-success">
                    Submit
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={closeModal}>
                    Close
                </button>
            </div>
        </form>
    );
};


export default ApplyForJobPopup