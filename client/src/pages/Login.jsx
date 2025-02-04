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
            console.log("formData", formData);
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

                toast.success(responseData.message);
                navigate("/users", { replace: true });
            } else {
                toast.error(responseData.message);
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("There was an error submitting the form.");
        }
    };

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Role:</label>
                        <select {...register('role', { required: true })}>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <span className='text-danger'>Role feild is required</span>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type='text' {...register('email', { required: true })} />
                        {errors.email && <span className='text-danger'>Email Field is required</span>}
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type='password' {...register('password', { required: true })} />
                        {errors.password && <span className='text-danger'>Password Field is required</span>}
                    </div>
                    <div>
                        <input type='submit' disabled={isSubmitting} value={isSubmitting ? 'Submitting' : 'Login'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login