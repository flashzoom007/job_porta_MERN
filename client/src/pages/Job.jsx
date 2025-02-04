import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../css/style.css'

const Job = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.fullname);
        formData.append('number', data.number);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append("photos", data.photos[0]);

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
                navigate('/', { replace: true });
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
          <h2 className="card-title text-center mb-4 h1 fw-bold">Add User</h2>
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
                {...register('number', { required: true })}
                className={`form-control ${errors.number ? 'is-invalid' : ''}`}
              />
              {errors.number && (
                <div className="invalid-feedback">Phone Number Field is required</div>
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
                {...register('photos', { required: true })}
                className={`form-control ${errors.photos ? 'is-invalid' : ''}`}
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
