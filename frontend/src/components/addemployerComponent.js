import React from 'react';
import '../css/index.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';

const validationSchema = Yup.object({
    companyName: Yup.string().required('Comapny name is required'),
    headquartersAddress: Yup.string().required('Company address is required'),
    descendentCompanies: Yup.string(),
    predecessorCompanies: Yup.string(),
});

function AddEmployer() {

    const initialValues = {
        companyName: '',
        headquartersAddress: '',
        descendentCompanies: '',
        predecessorCompanies: ''
    };

    //KYS WORK IN PROGRESS TO GET THE FORM TO SUBMIT

    const handleSubmit = async (values) => {
        //     await new Promise((r) => setTimeout(r, 500));
        //     alert(JSON.stringify(values, null, 2));
        // }}
        try {
            // Perform your API call to send the form data to the server here
            console.log('Form values submitted:', values);
            // You can use fetch or any other library to send a POST request to your server
            // Example:
            // const response = await fetch('your_api_endpoint_here', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(values),
            // });
            // Handle the response as needed

            // Optionally, you can reset the form values here
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <Box>
            <Stack sx={{ margin: 'auto' }}>
                <div><center>
                    <h1>Add Employer</h1></center>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <div>
                                <label htmlFor="companyName">Company Name:</label>
                                <Field type="text" id="companyName" name="companyName" />
                                <ErrorMessage name="companyNameError" component="div" />
                            </div>
                            <div>
                                <label htmlFor="headquartersAddress">headquartersAddress:</label>
                                <Field type="text" id="headquartersAddress" name="headquartersAddress" />
                                <ErrorMessage name="headquartersAddressError" component="div" />
                            </div>
                            <div>
                                <label htmlFor="descendantCompanies">descendantCompanies:</label>
                                <Field type="text" id="descendantCompanies" name="descendantCompanies" />
                                <ErrorMessage name="descendantCompanies" component="div" />
                            </div>
                            <div>
                                <label htmlFor="predecessorCompanies">predecessorCompanies:</label>
                                <Field type="text" id="predecessorCompanies" name="predecessorCompanies" />
                                <ErrorMessage name="predecessorCompanies" component="div" />
                            </div>
                            {/*Submit button*/}
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </Stack>
        </Box>
    )
};

export default AddEmployer;
