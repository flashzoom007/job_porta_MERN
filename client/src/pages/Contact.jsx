import React from "react";
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";


function Contact() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    async function onSubmit(data) {

        await new Promise(resolve => setTimeout(resolve, 3000)) // 3000 = 3sec wait, after form submit
        console.log('Form submitted successfully', data);
    }

    return (
        <div className="contact-us-container">
            <div className="form-section">
                <div className="form-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='main-section'>
                            <label>Name: </label>
                            <div>
                                <input
                                    type="text"
                                    {...register("fullname",
                                        { required: true },
                                        { pattern: /^[A-Za-z]+$/i }
                                    )}
                                />
                                {errors.fullname && <span className={errors.message ? '' : 'text-danger'}>Name Field is required</span>}
                            </div>
                        </div>
                        <div className='main-section'>
                            <label>Number: </label>
                            <div>
                                <input
                                    type="number"
                                    {...register("number", {
                                        required: true,
                                        minLength: {
                                            value: 10,
                                            message: 'Phone Number must be 10 digits long'
                                        },
                                        maxLength: {
                                            value: 13,
                                            message: 'Phone Number max 13 digits long'
                                        }
                                    })} />
                                {errors.number && <span className={errors.message ? '' : 'text-danger'}>{errors.number.message}</span>}
                            </div>
                        </div>
                        <div className='main-section'>
                            <label>Email: </label>
                            <div>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className={errors.message ? '' : 'text-danger'}>Enter Valid Email</span>}
                            </div>
                        </div>
                        <div className='main-section'>
                            <label>Gender: </label>
                            <select {...register("gender")}>
                                <option value="female">female</option>
                                <option value="male">male</option>
                                <option value="other">other</option>
                            </select>
                        </div>
                        <div>
                            <input type="submit" className="btn btn-outline-primary" disabled={isSubmitting} value={isSubmitting ? 'Submitting' : 'Submit'} />
                        </div>
                    </form>
                </div>
            </div>
            <div className="image-section">
                <img src="/contact.svg" alt="Contact Us"></img>
            </div>
        </div>
    );
}

export default Contact;