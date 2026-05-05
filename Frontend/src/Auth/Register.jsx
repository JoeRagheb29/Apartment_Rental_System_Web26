import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Register.module.css';
import axios from 'axios';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup'

const API = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
});

function Register() {
  // const [role, setRole] = useState('');
  // const [isSubmitting, setSubmitting] = useState(false);

  const formFields = [
    { id: 'name', name: 'name', label: 'Full Name', type: 'text', required: true },
    { id: 'email', name: 'email', label: 'Email', type: 'email', required: true },
    { id: 'password', name: 'password', label: 'Password', type: 'password', required: true },
    { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
  ];

  const YupSchema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    role: yup.string().required('Select your role'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = async (values , { resetForm , setSubmitting}) => {
    // console.log("btn clcd")
    try {
      console.log('User registering');
      // setSubmitting(true);
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...dataToSubmit } = values;
      const response = await API.post('/api/auth/register', dataToSubmit);

      console.log('User registered:', response.data);
      resetForm();
    } 
    catch (error) {
      console.error('Error registering user:', error);
    }
    finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <Formik
        initialValues={{ name: '', email: '', role: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validationSchema={YupSchema}
      >
        {({values , setFieldValue , isSubmitting }) => (
        <Form className={styles.registerForm}>
          <h2 className={'text-2xl font-bold mb-4'}>Create Account</h2>
          {
            formFields.map(field => (
              <div className={styles.formGroup} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <Field type={field.type} id={field.id} name={field.id} required={field.required} />
                <ErrorMessage name={field.id} component="div" className={styles.error} />
              </div>
            ))
          }
          <div className={styles.roleSelector}>
            <button type="button" className={`${styles.roleButton} ${values.role === 'tenant' ? styles.active : ''}`}
                onClick={() => setFieldValue('role', 'tenant')}>
                I'm a Tenant
            </button>
            <button
              type="button" className={`${styles.roleButton} ${values.role === 'owner' ? styles.active : ''}`}
              onClick={() => setFieldValue('role', 'owner')}>
                I'm an Owner
            </button>
            <ErrorMessage name="role" component="div" className={styles.error} />
          </div>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Waiting...' : 'Register'}
          </button>
          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
