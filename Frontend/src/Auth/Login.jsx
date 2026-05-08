import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  
  const API = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
  });

  const loginFormArr = [
    { id: 'email', name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
    { id: 'password', name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Enter your password' },
  ];

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    role: Yup.string().required('Please select your role'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Logging in with:', values);


      // respone data is just = logged innnnn (cant get user data)
      const response = await API.post('/api/auth/login', values);
      console.log('response data:', response.data);

      // Store user data and token in context and localStorage
      const { token, user } = response.data;
      console.log("user from response:", user);
      console.log("token from response:", token);
      handleLogin(user, token);

      alert('Logged in successfully!');

      console.log("role from values:", values.role)
      if(values.role === "owner") 
        navigate('/dashboard');
      else if(values.role === "tenant")
        navigate('/');

    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.registerForm}>
            <h2 className={styles.title}>Welcome Back</h2>
            <p style={{marginBottom: '1.5rem', color: 'rgb(107, 114, 128)', fontSize: '0.95rem'}}>
              Log in to your ApartmentHub account
            </p>

            {loginFormArr.map((field) => (
              <div className={styles.formGroup} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <Field 
                  type={field.type} 
                  name={field.name} 
                  id={field.id} 
                  required={field.required}
                  placeholder={field.placeholder}
                />
                <ErrorMessage name={field.name} component="div" className={styles.error} />
              </div>
            ))}

            <div className={styles.formGroup}>
              <label htmlFor="role">Select Your Role</label>
              <Field 
                as="select" 
                name="role" 
                id="role" 
                className={styles.select}
              >
                <option value="">Choose your role...</option>
                <option value="tenant">🏠 I'm a Tenant</option>
                <option value="owner">🏢 I'm an Owner</option>
              </Field>
              <ErrorMessage name="role" component="div" className={styles.error} />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Logging in...' : '✓ Log In'}
            </button>

            <p className={styles.loginLink}>
              Don't have an account? <Link to="/register">Sign up for free</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
