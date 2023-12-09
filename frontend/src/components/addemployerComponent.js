/*
import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
const Employer = require('../models/Employer.js');

const validationSchema = Yup.object({
    companyName: Yup.string().required('Comapny name is required'),
    headquartersAddress: Yup.string().required('Company address is required'),
});

const AddEmployer = () => {
    const employer = await Employer.create({
        companyName: companyName,
        headquartersAddress: headquartersAddress,
        descendentCompanies: descendentCompanies,
        predecessorCompanies: predecessorCompanies,
    });

    const initialValues = {
        companyName: companyName,
        headquartersAddress: headquartersAddress,
        descendentCompanies: descendentCompanies,
        predecessorCompanies: predecessorCompanies        
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
                    <label htmlFor="companyName">Company Name:</label>
                    <Field type="text" id="companyName" name="companyName" />
                </div>
                <div>
                        <label htmlFor="headquartersAddress">headquartersAddress:</label>
                        <Field type="text" id="headquartersAddress" name="headquartersAddress" />
                </div>
                <div>
                        <label htmlFor="descendantCompanies">descendantCompanies:</label>
                        <Field type="text" id="descendantCompanies" name="descendantCompanies" />
                    </div>
                    <div>
                        <label htmlFor="predecessorCompanies">predecessorCompanies:</label>
                        <Field type="text" id="predecessorCompanies" name="predecessorCompanies" />
                    </div>
                {/*Submit button}
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

ReactDOM.render(<AddEmployer />, document.getElementById('root'));
*/
