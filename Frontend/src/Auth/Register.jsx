import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Auth.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import { useContext } from 'react';
// import AuthContext from '../contexts/AuthContext';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
    timeout: 10000,
  });

function Register() {
  const navigate = useNavigate();
  // const { handleLogin } = useContext(AuthContext);

  const formFields = [
    { id: 'name', name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name' },
    { id: 'email', name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com' },
    { id: 'password', name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Minimum 4 characters' },
    { id: 'confirmPassword', name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true, placeholder: 'Confirm your password' },
  ];

  const YupSchema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    role: yup.string().required('Please select your role'),
    password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = async (values , { resetForm , setSubmitting}) => {
    try {
      console.log('User registering');
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...dataToSubmit } = values;
      const response = await API.post('/auth/register', dataToSubmit);

      console.log('User registered:', response.data);
      
      // // Auto-login after registration
      // const { usertoken, user } = response.data;
      // handleLogin(user, usertoken);

      // toast.success('Registration successful! Redirecting to dashboard.');
      navigate(values.role === 'owner' ? '/dashboard' : '/');
      resetForm();
    } 
    catch (error) {
      console.error('Error registering user:', error);
      toast.error('Registration failed. Please try again.');
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
          <h2 className={styles.title}>Create Account</h2>
          <p style={{marginBottom: '1.5rem', color: 'rgb(107, 114, 128)', fontSize: '0.95rem'}}>
            Join ApartmentHub and start your journey
          </p>
          
          {
            formFields.map(field => (
              <div className={styles.formGroup} key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <Field 
                  type={field.type} 
                  id={field.id} 
                  name={field.id} 
                  required={field.required}
                  placeholder={field.placeholder}
                />
                <ErrorMessage name={field.id} component="div" className={styles.error} />
              </div>
            ))
          }
          
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'rgb(17, 24, 39)', fontSize: '0.95rem'}}>
              Select Your Role
            </label>
            <div className={styles.roleSelector}>
              <button 
                type="button" 
                className={`${styles.roleButton} ${values.role === 'tenant' ? styles.active : ''}`}
                onClick={() => setFieldValue('role', 'tenant')}
              >
                🏠 Tenant
              </button>
              <button
                type="button" 
                className={`${styles.roleButton} ${values.role === 'owner' ? styles.active : ''}`}
                onClick={() => setFieldValue('role', 'owner')}
              >
                🏢 Owner
              </button>
            </div>
            <ErrorMessage name="role" component="div" className={styles.error} />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Creating Account...' : '✓ Create Account'}
          </button>
          
          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
