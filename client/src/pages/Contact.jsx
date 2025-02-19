import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import { InputMask } from "primereact/inputmask";

function Contact() {

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
                        <div className='main-section'>
                            <label>Name: </label>
                            <div>
                                <input
                                    className="form-control"
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
                                    className="form-control"
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
                                {/* <InputMask id="ssn" mask="999-99-9999" placeholder="999-99-9999"></InputMask> */}

                                {errors.number && <span className={errors.message ? '' : 'text-danger'}>{errors.number.message}</span>}
                            </div>
                        </div>
                        <div className='main-section'>
                            <label>Email: </label>
                            <div>
                                <input
                                    className="form-control"
                                    type="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className={errors.message ? '' : 'text-danger'}>Enter Valid Email</span>}
                            </div>
                        </div>
                        <div className='main-section'>
                            <label>Gender: </label>
                            <select className="form-select" {...register("gender")}>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
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