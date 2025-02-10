import "bootstrap/dist/css/bootstrap.min.css";
import 'react-tabs/style/react-tabs.css';
import { FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';

const JobDescription = ({ setTabIndex }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [items, setItems] = useState([]); // Responsibilities
    const [inputValue, setInputValue] = useState("");

    const [qualifications, setQualifications] = useState([]); // Qualifications
    const [qualificationValue, setQualificationValue] = useState("");

    const addResponsibility = () => {
        if (inputValue.trim()) {
            setItems([...items, inputValue]);
            setInputValue("");
        }
    };

    const removeResponsibility = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const addQualification = () => {
        if (qualificationValue.trim()) {
            setQualifications([...qualifications, qualificationValue]);
            setQualificationValue("");
        }
    };

    const removeQualification = (index) => {
        setQualifications(qualifications.filter((_, i) => i !== index));
    };

    const onSubmit = (data) => {
        const jobData = {
            ...data,
            responsibilities: items,
            qualifications: qualifications
        };

        console.log("Submitted Job Data:", jobData);
        toast.success("Job Description Added Successfully");
        setTabIndex(0);
    };

    const JobFields = [
        { label: "Create Job for (Position):", name: "position", type: "input" },
        { label: "Company Name:", name: "companyName", type: "input" },
        { label: "Company Locations:", name: "location", type: "input" },
        { label: "Overview:", name: "overview", type: "textarea" },
    ];

    return (
        <>
            <div className="main_desc">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {JobFields.map((field) => (
                            <div className="form-group col-md-6" key={field.name}>
                                <label htmlFor={field.name}>{field.label}</label>
                                {field.type === "input" ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={field.name}
                                        {...register(field.name, { required: true })}
                                    />
                                ) : (
                                    <textarea
                                        className="form-control"
                                        id={field.name}
                                        rows="3"
                                        {...register(field.name, { required: true })}
                                    />
                                )}
                                {errors[field.name] && (
                                    <span className="text-danger">This field is required</span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Responsibilities & Qualifications Section */}
                    <div className="inner_desc mt-3">
                        <div className="d-flex gap-3">
                            {/* Responsibilities */}
                            <div className="col-6 p-0">
                                <h4>Responsibilities</h4>
                                <div className="responsibility_section">
                                    <div className="d-flex justify-content-start gap-3 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                        />
                                        <button type="button" className="btn btn-outline-primary w-50" onClick={addResponsibility}>
                                            Add
                                        </button>
                                    </div>
                                    {items.length > 0 ? (
                                        <table className="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Desc</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger ms-3"
                                                                onClick={() => removeResponsibility(index)}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : <p>Nothing added yet...</p>}
                                </div>
                            </div>

                            {/* Qualifications */}
                            <div className="col-6 p-0">
                                <h4>Qualifications</h4>
                                <div className="qualification_section">
                                    <div className="d-flex justify-content-start gap-3 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={qualificationValue}
                                            onChange={(e) => setQualificationValue(e.target.value)}
                                        />
                                        <button type="button" className="btn btn-outline-primary w-50" onClick={addQualification}>
                                            Add
                                        </button>
                                    </div>
                                    {qualifications.length > 0 ? (
                                        <table className="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Desc</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {qualifications.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger ms-3"
                                                                onClick={() => removeQualification(index)}
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : <p>Nothing added yet...</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-outline-primary" onClick={() => setTabIndex(0)}>
                            <FaAngleLeft /> Previous
                        </button>
                        <button type="submit" className="btn btn-outline-success">
                            Create Job <FaAngleRight />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default JobDescription;
