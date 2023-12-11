import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
});

const AddEmployee = () => {
    const initialValues = {
        id: +1,
        firstName: '',
        lastName: '',
        employer: '',
        ssn: '',
    };

    // Handle form submission
    const onSubmit = (values) => {
        // Handle form submission logic
        console.log(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <Field type="text" id="firstName" name="firstName" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <Field type="text" id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="ssn">SSN:</label>
                    <Field type="BIGINT" id="ssn" name="ssn" />
                </div>

                {/* Submit button */}
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

ReactDOM.render(<AddEmployee />, document.getElementById('root'));