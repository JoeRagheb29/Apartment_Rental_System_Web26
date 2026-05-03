import styles from './Profile.module.css';

const Profile = () => {
  // Dummy data, will be replaced with data from API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://via.placeholder.com/150'
  };

  return (
    <div className={styles.profile}>
      <h2>Edit Your Profile</h2>
      <form>
        <div className={styles.profilePicture}>
          <img src={user.profilePicture} alt="Profile" />
          <input type="file" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" defaultValue={user.name} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" defaultValue={user.email} />
        </div>
        <button type="submit" className={styles.submitButton}>Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
