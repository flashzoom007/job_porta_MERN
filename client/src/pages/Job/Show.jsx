import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getShowJobUsers, deleteCreatedJobPosition, deleteAllCreatedJobs } from '../Apis/CommonApi';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import CreateJob from './CreateJob';
import "bootstrap/dist/css/bootstrap.min.css";

const ShowJob = () => {
  const navigate = useNavigate();
  const [companyShow, setCompanyShow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const isAuthenticated = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const handleRefresh = () => {
    setRefresh(prev => !prev);
    navigate(0);
  };

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    getShowJobUsers(setCompanyShow, setShowModal);
  }, [refresh]);

  const onSubmit = async (data) => {
    try {
      let apiUrl = `${import.meta.env.VITE_BACKEND_URL}/create-new-job`;

      const userId = localStorage.getItem("userId");

      let payload = {
        company_name: data.company_name,
        role: data.role,
        description: data.description,
        skills: data.skills,
        salary: data.salary,
        job_type: data.job_type,
        experience: data.experience,
        location: data.location,
        posted_by: userId
      };

      if (isEditMode && selectedCompany) {
        apiUrl = `${import.meta.env.VITE_BACKEND_URL}/update-new-job`;
        payload.id = selectedCompany.id;
      }

      console.log('apiUrl:', apiUrl);

      const response = await axios.post(apiUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('response.data:', response.data);

      if (response.data.statusCode === 200) {
        closeModal();
        handleRefresh();
        toast.success(response.data.message);
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

    // Ensure all values, including dropdowns, remain the same
    setValue("company_name", company.company_name);
    setValue("role", company.role);
    setValue("description", company.description);
    setValue("skills", company.skills);
    setValue("salary", company.salary);
    setValue("job_type", company.job_type); // Ensure dropdown value stays the same
    setValue("experience", company.experience);
    setValue("location", company.location);
  };

  const handleDelete = async (companyId) => {
    try {
      await deleteCreatedJobPosition(companyId);
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
      {userRole !== "student" &&
        <div className='d-flex flex-wrap justify-content-between align-items-center my-3'>
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
              deleteAllCreatedJobs();
            }}
            className="btn btn-outline-danger mb-3"
          >
            Delete All
          </button>
        </div>
      }
      {showModal && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit job' : 'Add job'}</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <CreateJob
                  onSubmit={onSubmit}
                  isEditMode={isEditMode}
                  closeModal={closeModal}
                  selectedJob={selectedCompany}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered border-dark">
          <thead>
            <tr>
              {(userRole === "student" || userRole === "admin") && <th>Apply</th>}
              <th>ID</th>
              <th>Company Name</th>
              <th>Role</th>
              <th>Description</th>
              <th>Skills</th>
              {/* <th>Salary</th> */}
              <th>Job Type</th>
              <th>Experience<br />(Years)</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Posted By</th>
              {userRole !== "student" && <th>Edit</th>}
              {userRole !== "student" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {companyShow.map((company, index) => (
              <tr key={company.id}>
                {(userRole === "student" || userRole === "admin") && <td> <button className="btn btn-outline-primary" onClick={() => handleEdit(company)} > <FaEdit /> </button> </td>}
                <td>{index + 1}</td>
                <td>{company.company_name}</td>
                <td>{company.role}</td>
                <td>{company.description}</td>
                <td>{company.skills}</td>
                {/* <td>{company.salary}</td> */}
                <td>{company.job_type}</td>
                <td>{company.experience}</td>
                <td>{company.location}</td>
                <td>{company.created_at.split("T")[0]}</td>
                <td>{company.posted_by_name}</td>
                {userRole !== "student" && <td> <button className="btn btn-outline-primary" onClick={() => handleEdit(company)} > <FaEdit /> </button> </td>}
                {userRole !== "student" && <td> <button className="btn btn-outline-danger" onClick={() => handleDelete(company.id)} > <FaTrash /> </button> </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowJob;