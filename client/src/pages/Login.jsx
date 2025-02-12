import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/login`;

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ email, password, role }),
            });
      
            const responseData = response.data;
            console.log("responseData", responseData);

            if (responseData.statusCode === 200) {
                const userRole = responseData.user.role;
                const userToken = responseData.token;

                if (!userToken) {
                    toast.error("Authentication failed. No token received.");
                    return;
                }

                localStorage.setItem("userToken", userToken);
                localStorage.setItem("userRole", userRole);
                localStorage.setItem("userId", responseData.user.id);
                localStorage.setItem("userName", responseData.user.name);

                // Send user details to backend for logging
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/log-login`, {
                    userId: responseData.user.id,
                    userName: responseData.user.name,
                    email: responseData.user.email,
                });

                navigate("/users", { replace: true });
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("There was an error submitting the form.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg rounded" style={{ width: "350px" }}>
                <h3 className="text-center mb-3">Login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <label className="form-label">Role:</label>
                        <select
                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                            {...register('role', { required: "Role field is required" })}
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                    </div>

                    {/* Email Input */}
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', { required: "Email field is required" })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Password Input */}
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password', { required: "Password field is required" })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;