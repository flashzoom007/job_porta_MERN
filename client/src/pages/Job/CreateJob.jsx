import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCompany, getAllJobPosition } from '../Apis/CommonApi';

const CreateJob = ({ onSubmit, isEditMode, closeModal, selectedJob }) => {
  const { register, watch, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  const [companies, setCompanies] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (isEditMode && selectedJob) {
      Object.keys(selectedJob).forEach((key) => {
        setValue(key, selectedJob[key]);
      });
    } else {
      reset();
    }

    getAllCompany((data) => {
      setCompanies(data);
    });
    getAllJobPosition((data) => {
      setPositions(data);
    });
  }, [isEditMode, selectedJob, setValue, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
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

          {errors.company_name && <p className="text-danger">{errors.company_name?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Job Role</label>
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
          {errors.role && <p className="text-danger">{errors.role?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            {...register('description', { required: 'Description is required.' })}
            rows="3"
          />
          {errors.description && <p className="text-danger">{errors.description?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Skills</label>
          <input
            type="text"
            className="form-control"
            {...register('skills', { required: 'Skills are required.' })}
          />
          {errors.skills && <p className="text-danger">{errors.skills?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            {...register('salary', { required: 'Salary is required.', valueAsNumber: true })}
          />
          {errors.salary && <p className="text-danger">{errors.salary?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <select
            className="form-select"
            {...register("job_type", { required: 'Job Type is required.' })}
            defaultValue={selectedJob?.job_type || ""}
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contract</option>
          </select>
          {errors.job_type && <p className="text-danger">{errors.job_type?.message}</p>}

        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <input
            type="text"
            className="form-control"
            {...register('experience', { required: 'Experience is required.' })}
          />
          {errors.experience && <p className="text-danger">{errors.experience?.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">location</label>
          <input
            type="text"
            className="form-control"
            {...register('location', { required: 'location is required.' })}
          />
          {errors.location && <p className="text-danger">{errors.location?.message}</p>}
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button type="submit" className="btn btn-outline-success">
            {isEditMode ? 'Update' : 'Add'}
          </button>
          <button type="button" className="btn btn-outline-danger" onClick={closeModal}> Close </button>
        </div>
      </form>
    </>
  );
};

export default CreateJob;