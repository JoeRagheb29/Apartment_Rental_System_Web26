import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import AuthContext from '../contexts/AuthContext';

const Profile = () => {
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ownedApartments, setOwnedApartments] = useState([]);
  const [rentedApartment, setRentedApartment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
    timeout: 10000,
  });

  useEffect(() => {
    const fetchProfileAndApartments = async () => {
      try {
        const token = localStorage.getItem('userToken'); 
        
        if(!token) {
           setError("You must login first");
           setLoading(false);
           return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Get user profile
        const userRes = await API.get('user/profile', config);
        const fetchedUser = {
  ...userRes.data,
  role: userRes.data.role,
  ProfilePicture:
    userRes.data.ProfilePicture ||
    "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Download-Image.png"
};

        console.log("user: ",fetchedUser);
        setUser(fetchedUser);
        setEditData(fetchedUser);
        
        // Store updated user in localStorage
        localStorage.setItem('user', JSON.stringify(fetchedUser));

        // Get apartments based on role
        if (fetchedUser.role === 'owner') {
          const ownedApts = await API.get('apartments/profile/my-listings', config);
          setOwnedApartments(ownedApts.data);
        } else if (fetchedUser.role === 'tenant') {
          const rentedApts = await API.get('apartments/profile/my-rentals', config);
          if (rentedApts.data.length > 0) {
            setRentedApartment(rentedApts.data[0]);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error loading data");
        setLoading(false);
      }
    };

    fetchProfileAndApartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await API.put('/user/profile',
        { name: editData.name, email: editData.email }, 
        config
      );

      // نحدث الـ State بالبيانات الجديدة اللي رجعت من السيرفر
      const updatedUser = {
        ...user,
        name: response.data.name,
        email: response.data.email,
      };
      setUser(updatedUser);
      setEditData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success('تم تحديث البيانات بنجاح!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('حدث خطأ أثناء التحديث');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qrvfwtm2");

      // Upload to Cloudinary
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dgnzhsnna/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;

      // Update user profile with new image
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      await API.put('/user/profile',
        { ProfilePicture: imageUrl },
        config
      );

      // Update state with new image
      const updatedUser = {
  ...user,
  ProfilePicture: imageUrl
};
      setUser(updatedUser);
      setEditData(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Profile picture updated successfully! ✨');
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Error uploading photo:');
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading profile...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center', marginTop: '50px'}}>{error}</div>;
  if (!user) return null;

  return (
    <div className={styles.pageWrapper}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.profileCard}>
          <div className={styles.profilePictureContainer}>
            <img
  src={user.ProfilePicture}
  alt={user.name}
  className={styles.profilePicture}
/>
            <div className={styles.roleTag}>{user.role.toUpperCase()}</div>
            <label htmlFor="photoUpload" className={styles.photoUploadLabel}>
              📸
            </label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>📧 {user.email}</p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{user.role === 'owner' ? ownedApartments.length : (rentedApartment ? 1 : 0)}</span>
                <span className={styles.statLabel}>{user.role === 'owner' ? 'Owned' : 'Renting'}</span>
              </div>
            </div>
          </div>

          <button 
            className={styles.editBtn}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className={styles.editFormContainer}>
            <form onSubmit={handleSaveChanges} className={styles.editForm}>
              <h3>Edit Your Profile</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  placeholder="Enter your email"
                />
              </div>

              <button type="submit" className={styles.saveBtn}>
                💾 Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
      

      {/* Owned Apartments Section - Only for Owners */}
      {user.role === 'owner' && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🏠 Your Owned Apartments</h2>
            <p className={styles.sectionSubtitle}>Properties you own and their rental status</p>
          </div>
          {ownedApartments.length > 0 ? (
            <div className={styles.apartmentsGrid}>
              {ownedApartments.map((apt) => (
                <div key={apt._id} className={styles.apartmentCard}>
                  <div className={styles.apartmentImageContainer}>
                    <img 
                      src={apt.ApartmentPictures?.[0] || 'https://via.placeholder.com/300'} 
                      alt={apt.City}
                      className={styles.apartmentImage}
                    />
                    <span className={apt.tenant ? `${styles.statusBadge} ${styles.rented}` : styles.statusBadge}>
                      {apt.tenant ? 'RENTED' : 'AVAILABLE'}
                    </span>
                  </div>
                  <div className={styles.apartmentContent}>
                    <h3 className={styles.apartmentCity}>{apt.City}</h3>
                    <p className={styles.apartmentLocation}>📍 {apt.location}</p>
                    <div className={styles.apartmentDetails}>
                      <span>🛏️ {apt.NumberOfRooms} Rooms</span>
                      <span>📏 {apt.Area}m²</span>
                    </div>
                    <div className={styles.apartmentPrice}>{apt.price} EGP/month</div>
                    
                    {apt.tenant ? (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#f0fdf4',
                        borderRadius: '6px',
                        borderLeft: '4px solid #10b981'
                      }}>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                          <strong>👤 Tenant:</strong> {apt.tenant?.name || 'Loading...'}
                        </p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                          <strong>📧 Email:</strong> {apt.tenant?.email || 'N/A'}
                        </p>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#059669' }}>
                          ✓ Currently Rented
                        </p>
                      </div>
                    ) : (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#fef3c7',
                        borderRadius: '6px',
                        borderLeft: '4px solid #f59e0b'
                      }}>
                        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', color: '#92400e' }}>
                          ⚠️ No tenant assigned
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No owned apartments yet</p>
            </div>
          )}
        </section>
      )}

      {/* Rented Apartment Section - Only for Tenants */}
      {user.role === 'tenant' && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🔑 Your Rented Apartment</h2>
            <p className={styles.sectionSubtitle}>The apartment you are living in</p>
          </div>
          {rentedApartment ? (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div key={rentedApartment._id} className={styles.apartmentCard}>
                <div className={styles.apartmentImageContainer}>
                  <img 
                    src={rentedApartment.ApartmentPictures?.[0] || 'https://via.placeholder.com/300'} 
                    alt={rentedApartment.City}
                    className={styles.apartmentImage}
                  />
                  <span className={`${styles.statusBadge} ${styles.rented}`}>RENTING</span>
                </div>
                <div className={styles.apartmentContent}>
                  <h3 className={styles.apartmentCity}>{rentedApartment.City}</h3>
                  <p className={styles.apartmentLocation}>📍 {rentedApartment.location}</p>
                  <div className={styles.apartmentDetails}>
                    <span>🛏️ {rentedApartment.NumberOfRooms} Rooms</span>
                    <span>📏 {rentedApartment.Area}m²</span>
                    <span>👁️ {rentedApartment.View}</span>
                  </div>
                  <div className={styles.apartmentPrice}>{rentedApartment.price} EGP/month</div>
                  
                  {rentedApartment.description && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px'
                    }}>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        <strong>📝 Description:</strong> {rentedApartment.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>You haven't rented any apartment yet</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Profile;