import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css'; // استخدم نفس ملف الـ CSS للاتساق
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const API = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000,
  });

  const loginFormArr = [
    { id: 'email', name: 'email', label: 'Email', type: 'email', required: true },
    { id: 'password', name: 'password', label: 'Password', type: 'password', required: true },
  ];

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Logging in with:', values);

      const response = await API.post('/api/login', values);
      console.log('response data:', response.data);

      alert('Logged in successfully!');

      if(values.role === "owner") 
        navigate('/dashboard');
      else if(values.role === "tenant")
        navigate('/');

    } catch (error) {
      console.error(error);
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
            <h2 className={'text-2xl font-bold mb-4'}>Welcome Back</h2>
            <p className="mb-6 text-gray-600">Please enter your details</p>

            {loginFormArr.map((field) => (
              <div className={styles.formGroup} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <Field type={field.type} name={field.name} id={field.id} required={field.required} />
                <ErrorMessage name={field.name} component="div" className={styles.error} />
              </div>
            ))}

            <button type="submit" 
              className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log In'}
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
