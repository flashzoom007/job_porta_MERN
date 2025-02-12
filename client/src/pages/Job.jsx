import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css'
import { useState } from 'react';
import { handleFileChange, handleUpload } from "./Apis/CommonApi";
import { FaAngleLeft } from "react-icons/fa";


const Job = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();

  const onSubmit = async (data) => {
    const uploadFileName = await handleUpload();
    if (!uploadFileName) {
      return null;
    }

    const formData = {
      name: data.fullname,
      number: data.number,
      email: data.email,
      password: data.password,
      role: data.role,
      file_upload: uploadFileName
    };
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-users`;

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const responseData = response.data;
      if (responseData.statusCode === 200) {
        toast.success(responseData.message);
        navigate('/login', { replace: true });
      } else if (responseData.statusCode === 400) {
        toast.error(responseData.message);
      } else {
        toast.error(responseData.message);
      }
    } catch (err) {
      toast.error('There was an error submitting the form.', err);
    }
  };

  return (
    <>
      <div className="container form-container">
        <div className="card ">
          <div className="card-body">
            <div className='d-flex justify-content-between align-items-baseline'>
              <h2 className="card-title text-center mb-4 h1 fw-bold">Add User</h2>

              <Link to='/users' className="text-decoration-none">
                <button className="btn btn-outline-primary link-hover"> <FaAngleLeft /> Back </button>
              </Link>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} method="POST">

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  {...register('fullname', { required: true })}
                  className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                />
                {errors.fullname && (
                  <div className="invalid-feedback">Full Name Field is required</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="number"
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && (
                  <div className="invalid-feedback">Email Field is required</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
                {errors.password && (
                  <div className="invalid-feedback">Password Field is required</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  {...register('role', { required: true })}
                  className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <div className="invalid-feedback">Select any of role first</div>
                )}
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
              <div className="d-grid">
                <input
                  type="submit"
                  disabled={isSubmitting}
                  value={isSubmitting ? 'Submitting...' : 'Add User'}
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Job;