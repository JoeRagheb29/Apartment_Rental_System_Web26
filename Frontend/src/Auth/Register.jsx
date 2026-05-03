import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Register.module.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
});

function Register() {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setSubmitting(true);
    API.post('/api/auth/register', values)
      .then(response => {
        console.log('User registered:', response.data);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleValidate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be 6 characters or more';
    }

    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className={styles.registerContainer}>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
        validate={handleValidate}
      >
        <Form className={styles.registerForm}>
          <h2 className={styles.title}>Create Account</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" required />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" required />
            <ErrorMessage name="password" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" required />
            <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Waiting...' : 'Register'}
          </button>

          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
