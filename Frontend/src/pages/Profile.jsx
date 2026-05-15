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
  const [rentedApartments, setRentedApartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchProfileAndApartments = async () => {
      try {
        // 1. هنجيب التوكن بتاع اليوزر من اللوكال ستوريدج (لازم تكون مسيفه وقت اللوجن بنفس الاسم)
        const token = localStorage.getItem('userToken'); 
        
        // لو مفيش توكن ممكن توقعه لصفحة اللوجن هنا
        if(!token) {
           setError("يجب تسجيل الدخول أولاً");
           setLoading(false);
           return;
        }

        console.log("token found from profile:", token);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // 2. نجيب بيانات اليوزر
        const userRes = await axios.get('http://localhost:5000/api/user/profile', config);

        // بنحط داتا افتراضية لو مش موجودة في الداتابيز عشان التصميم ميبوظش
        const fetchedUser = {
          ...userRes.data,
          role: userRes.data.role || 'user',
          profilePicture: userRes.data.profilePicture || "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
        };

        setUser(fetchedUser);
        setEditData(fetchedUser); // بنجهز الداتا جوه الفورم

        // 3. نجيب بيانات الشقق (زي ما إنت كنت عاملها)
        const apartmentsRes = await fetch('http://localhost:5000/api/apartments', config);
        const apartments = await apartmentsRes.json();
        
        // For demo purposes
        setOwnedApartments(apartments.slice(0, 3));
        setRentedApartments(apartments.slice(3, 5));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("حدث خطأ في تحميل البيانات");
        setLoading(false);
      }
    };

    fetchProfileAndApartments();
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

      // نبعت التعديلات للباك إند
      const response = await axios.put(
        'http://localhost:5000/api/user/profile',
        { name: editData.name, email: editData.email }, 
        config
      );

      // نحدث الـ State بالبيانات الجديدة اللي رجعت من السيرفر
      setUser({
        ...user,
        name: response.data.name,
        email: response.data.email
      });
      setIsEditing(false);
      toast.success('تم تحديث البيانات بنجاح!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('حدث خطأ أثناء التحديث');
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