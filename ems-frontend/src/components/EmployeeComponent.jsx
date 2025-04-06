import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then(response => {
                    if (response.data) {
                        setEmployee({
                            firstName: response.data.firstName || '',
                            lastName: response.data.lastName || '',
                            email: response.data.email || ''
                        });
                    }
                })
                .catch(error => console.error("Error fetching employee data:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (id) {
                updateEmployee(id, employee)
                    .then(response => {
                        console.log("Updated Employee:", response.data);
                        navigate('/employees');
                    })
                    .catch(error => {
                        console.error("Error updating employee:", error);
                    });
            } else {
                createEmployee(employee)
                    .then(response => {
                        console.log("Created Employee:", response.data);
                        navigate('/employees');
                    })
                    .catch(error => {
                        console.error("Error creating employee:", error);
                    });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { firstName: '', lastName: '', email: '' };
        
        if (!employee.firstName.trim()) {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (!employee.lastName.trim()) {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (!employee.email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className='container'>
            <br /> <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center'>{id ? 'Update Employee' : 'Create Employee'}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    placeholder='Enter Employee First Name'
                                    value={employee.firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    placeholder='Enter Employee Last Name'
                                    value={employee.lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    name='email'
                                    placeholder='Enter Employee Email'
                                    value={employee.email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;