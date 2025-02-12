import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { handleFileChange, handleUpload } from "./CommonApi";
import { FaAngleLeft } from "react-icons/fa";

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-show-users?id=${id}`;
                const response = await axios.get(apiUrl);
                const userData = response.data.user;

                // Set form values dynamically
                setValue("fullname", userData.name);
                setValue("email", userData.email);
                setValue("password", userData.password);
                setValue("role", userData.role);
                setValue("number", userData.number);
                setValue("uploadFileName", userData.uploadFileName);
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching user details");
                setIsLoading(false);
            }
        };
        fetchUserDetails();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const uploadedFileName = await handleUpload();
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", data.fullname);
            formData.append("password", data.password);
            formData.append("role", data.role);
            formData.append("number", data.number);
            formData.append("file_upload", uploadedFileName);

            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-user`;
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 200) {
                toast.success("User updated successfully!");
                navigate("/users");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container form-container">
            <div className="card ">
                <div className="card-body">
                    <div className='d-flex justify-content-between align-items-baseline'>
                        <h2 className="card-title text-center mb-4 h1 fw-bold">Update User</h2>
                        <Link to='/users' className="text-decoration-none">
                            <button className="btn btn-outline-primary link-hover"> <FaAngleLeft /> Back </button>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                {...register("fullname", { required: true })}
                                className={`form-control ${errors.fullname ? "is-invalid" : ""}`}
                            />
                            {errors.fullname && (
                                <div className="invalid-feedback">Full Name Field is required</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className='form-control clr-grey'
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">Password is required</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                {...register('number', {
                                    required: true,
                                    minLength: {
                                        value: 10,
                                        message: 'Full name must be at least 10 characters long'
                                    }
                                },
                                    {
                                        maxLength: {
                                            value: 13,
                                            message: 'Full name must be at most 13 characters long'
                                        }

                                    })}
                                className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                            />
                            {errors.number && (
                                <div className="invalid-feedback">{errors.number.message}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                {...register("role", { required: true })}
                                className={`form-select ${errors.role ? "is-invalid" : ""}`}
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <div className="invalid-feedback">Select any role</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photos",
                                    // { required: true }
                                )}
                                className={`form-control ${errors.photos ? "is-invalid" : ""}`}
                                onChange={handleFileChange}
                            />
                            {errors.photos && <div className="invalid-feedback">Upload the photo</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? "Updating..." : "Update User"}
                        </button>
                    </form>
                </div></div>
        </div>
    );
};

export default UpdateUser;