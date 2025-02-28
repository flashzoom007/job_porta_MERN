import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import { InputMask } from "primereact/inputmask";

function Contact() {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    const {
        register,
        handleSubmit,
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
                        <div className='input-group'>
                            <input required
                                className=""
                                value={userName || ''}
                                type="text"
                                {...register("fullname",
                                    { required: true },
                                    { pattern: /^[A-Za-z]+$/i }
                                )}
                            />
                            <label>Your Name: </label>
                            {errors.fullname && <span className={errors.message ? '' : 'text-danger'}>Name Field is required</span>}
                        </div>

                        <div className='input-group'>
                            <input required
                                className=""
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
                            <label>Phone Number: </label>
                            {/* <InputMask id="ssn" mask="999-99-9999" placeholder="999-99-9999"></InputMask> */}

                            {errors.number && <span className={errors.message ? '' : 'text-danger'}>{errors.number.message}</span>}
                        </div>

                        <div className='input-group'>
                            <input required
                                className=""
                                type="email"
                                value={userEmail || ''}
                                {...register("email", { required: true })}
                            />
                            <label>Email: </label>
                            {errors.email && <span className={errors.message ? '' : 'text-danger'}>Enter Valid Email</span>}
                        </div>

                        <div className='main-section gap-3 align-items-center'>
                            <label>Gender: </label>
                            <select className="form-select" {...register("gender")}>
                                <option value="">Select option</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <input
                                type="textarea"
                                className="form-control"                           
                            />
                            {errors.message && <p className="text-danger">{errors.message?.message}</p>}
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