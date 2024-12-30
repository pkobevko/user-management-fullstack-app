import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewUser } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddUserForm = (props) => (
    <Formik
        initialValues={{ firstName: '', lastName: '', email: ''}}
        validate={values => {
            let errors = {};

            if (!values.firstName) {
                errors.firstName = 'First Name Required'
            }

            if (!values.lastName) {
                errors.lastName = 'Last Name Required'
            }

            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            
            return errors;
        }}
        onSubmit={(user, { setSubmitting }) => {
            addNewUser(user).then(() => {
                props.onSuccess();
            })
            .catch(err => {
                props.onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            })
        }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
        /* and other goodies */
    }) => (
        <form onSubmit={handleSubmit}>
            <Input
                style={inputBottomMargin}
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder='First name. E.g John'
            />
            {errors.firstName && touched.firstName &&
                    <Tag style={tagStyle}>{errors.firstName}</Tag>}
            <Input
                style={inputBottomMargin}
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                placeholder='Last name. E.g Jones'
            />
            {errors.lastName && touched.lastName && 
                <Tag style={tagStyle}>{errors.lastName}</Tag>}
            <Input
                style={inputBottomMargin}
                name="email"
                type='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Email. E.g example@gmail.com'
            />
            {errors.email && touched.email && 
                <Tag style={tagStyle}>{errors.email}</Tag>}
            <Button 
                onClick={() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid)}>
                Submit
            </Button>
        </form>
    )}
    </Formik>
);


export default AddUserForm;