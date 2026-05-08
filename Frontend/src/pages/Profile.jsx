import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'raghebb',
    email: 'raghebb@admin.com',
    role: 'owner',
    profilePicture: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
  });

  const [ownedApartments, setOwnedApartments] = useState([]);
  const [rentedApartments, setRentedApartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  useEffect(() => {
    // Fetch apartments data from API
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/apartments');
        const apartments = response.data;
        
        // For demo purposes, assume first 3 are owned and next 2 are rented
        setOwnedApartments(apartments.slice(0, 3));
        setRentedApartments(apartments.slice(3, 5));
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setUser(editData);


    setIsEditing(false);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Profile Header Section */}
      <div className={styles.profileHeader}>
        <div className={styles.profileCard}>
          <div className={styles.profilePictureContainer}>
            <img src={user.profilePicture} alt={user.name} className={styles.profilePicture} />
            <div className={styles.roleTag}>{user.role.toUpperCase()}</div>
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.userName}>{user.name}</h1>
            <p className={styles.userEmail}>📧 {user.email}</p>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{ownedApartments.length}</span>
                <span className={styles.statLabel}>Owned</span>
              </div>
              <div className={styles.divider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{rentedApartments.length}</span>
                <span className={styles.statLabel}>Rented</span>
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

      {/* Owned Apartments Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🏠 Your Owned Apartments</h2>
          <p className={styles.sectionSubtitle}>Properties you own</p>
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
                  <span className={styles.statusBadge}>OWNED</span>
                </div>
                <div className={styles.apartmentContent}>
                  <h3 className={styles.apartmentCity}>{apt.City}</h3>
                  <p className={styles.apartmentLocation}>📍 {apt.location}</p>
                  <div className={styles.apartmentDetails}>
                    <span>🛏️ {apt.NumberOfRooms} Rooms</span>
                    <span>📏 {apt.Area}m²</span>
                  </div>
                  <div className={styles.apartmentPrice}>{apt.price} EGP/month</div>
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

      {/* Rented Apartments Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🔑 Your Rented Apartments</h2>
          <p className={styles.sectionSubtitle}>Properties you are renting</p>
        </div>
        {rentedApartments.length > 0 ? (
          <div className={styles.apartmentsGrid}>
            {rentedApartments.map((apt) => (
              <div key={apt._id} className={styles.apartmentCard}>
                <div className={styles.apartmentImageContainer}>
                  <img 
                    src={apt.ApartmentPictures?.[0] || 'https://via.placeholder.com/300'} 
                    alt={apt.City}
                    className={styles.apartmentImage}
                  />
                  <span className={`${styles.statusBadge} ${styles.rented}`}>RENTING</span>
                </div>
                <div className={styles.apartmentContent}>
                  <h3 className={styles.apartmentCity}>{apt.City}</h3>
                  <p className={styles.apartmentLocation}>📍 {apt.location}</p>
                  <div className={styles.apartmentDetails}>
                    <span>🛏️ {apt.NumberOfRooms} Rooms</span>
                    <span>📏 {apt.Area}m²</span>
                  </div>
                  <div className={styles.apartmentPrice}>{apt.price} EGP/month</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No rented apartments yet</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
