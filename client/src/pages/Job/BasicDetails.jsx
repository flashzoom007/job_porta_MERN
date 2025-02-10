import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-tabs/style/react-tabs.css';
import { Form } from 'react-bootstrap';
import './style.css'
import { FaAngleRight } from "react-icons/fa";

const BasicDetails = ({ setTabIndex }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    return (
        <>
            <form>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="location">Job Location:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="location"
                            {...register('location', { required: true })}
                        />
                        {errors.location && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="experience">Experience:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="experience"
                            {...register('experience', { required: true })}
                        />
                        {errors.experience && <span className="text-danger">This field is required</span>}
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="category">Job Category:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="category"
                            {...register('category', { required: true })}
                        />
                        {errors.category && <span className="text-danger">This field is required</span>}
                    </div>

                    <div className="form-group col-md-6">
                        <label>Job Type:</label>
                        <div className="d-flex gap-3">
                            <Form.Check
                                type="radio"
                                label="Full Time"
                                name="jobType"
                                id="fulltime"
                                value="fulltime"
                                {...register('jobType', { required: true })}
                            />
                            <Form.Check
                                type="radio"
                                label="Part Time"
                                name="jobType"
                                id="parttime"
                                value="parttime"
                                {...register('jobType', { required: true })}
                            />
                        </div>
                        {errors.jobType && <span className="text-danger">This field is required</span>}
                    </div>
                </div>

                <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="minSalary">Minimum Salary(LPA):</label>
                        <Form.Select
                            aria-label="Minimum Salary"
                            id="minSalary"
                            className="form-control"
                            {...register('minSalary', { required: true })}
                        >
                            <option value="">Select value</option>
                            <option value="0-3">0 - 3</option>
                            <option value="3-6">3 - 6</option>
                            <option value="6-9">6 - 9</option>
                        </Form.Select>
                        {errors.minSalary && <span className="text-danger">This field is required</span>}
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="maxSalary">Maximum Salary(LPA):</label>
                        <Form.Select
                            aria-label="Maximum Salary"
                            id="maxSalary"
                            className="form-control"
                            {...register('maxSalary', { required: true })}
                        >
                            <option value="">Select value</option>
                            <option value="0-3">0 - 3</option>
                            <option value="3-6">3 - 6</option>
                            <option value="6-9">6 - 9</option>
                        </Form.Select>
                        {errors.maxSalary && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="skills">Skills:</label>
                    <textarea
                        className="form-control"
                        id="skills"
                        {...register('skills', { required: true })}
                        rows="3"
                    />
                    {errors.skills && <span className="text-danger">This field is required</span>}
                </div>
                <div className="col-md-3 mt-3">
                    <button className="btn btn-outline-primary link-hover" onClick={() => setTabIndex(1)}> Next  <FaAngleRight /></button>
                </div>
            </form>
        </>
    )
}

export default BasicDetails