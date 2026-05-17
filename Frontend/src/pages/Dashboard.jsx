import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '../components/Admin/Modal';

const Dashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    City: '',
    NumberOfRooms: '',
    Area: '',
    View: '',
    price: '',
    location: '',
    description: '',
    floorNumber: '',
    totalFloors: '',
    amenities: [],
    petFriendly: false,
    ApartmentPictures: [],
  });

  const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/',
    timeout: 10000,
  });

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
      const res = await API.get('apartments/profile/my-listings', config);

        setApartments(res.data);
        console.log("Fetched apartments: ", res.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'NumberOfRooms' || name === 'Area' || name === 'price' || name === 'floorNumber' || name === 'totalFloors'
        ? Number(value) 
        : Array.isArray(value) ? value : value,
    }));
  };

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      ApartmentPictures: [...prev.ApartmentPictures, ...files], 
    }));
  
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
};

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      ApartmentPictures: prev.ApartmentPictures.filter((_, i) => i !== index),
    }));

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };


  const handleOpenModal = (apartment = null) => {
    if (apartment) {
      setFormData(apartment);
      setEditingId(apartment._id);
    } else {
      setFormData({
        Title: '',
        City: '',
        NumberOfRooms: '',
        Area: '',
        View: '',
        price: '',
        location: '',
        description: '',
        floorNumber: '',
        totalFloors: '',
        amenities: [],
        petFriendly: false,
        ApartmentPictures: [],
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      Title: '',
      City: '',
      NumberOfRooms: '',
      Area: '',
      View: '',
      price: '',
      location: '',
      description: '',
      floorNumber: '',
      totalFloors: '',
      amenities: [],
      petFriendly: false,
      ApartmentPictures: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. الـ Validation
    if (!formData.Title || !formData.City || !formData.NumberOfRooms || !formData.Area || !formData.View || !formData.price || !formData.location || formData.floorNumber === '' || formData.totalFloors === '') {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      toast.success('Uploading images, please wait...'); 
      
      const onlineUrls = await Promise.all(
        formData.ApartmentPictures.map(async (item) => {
          if (typeof item === 'string') return item;
          
          const data = new FormData();
          data.append("file", item);
          data.append("upload_preset", "qrvfwtm2");

          const res = await axios.post("https://api.cloudinary.com/v1_1/dgnzhsnna/image/upload", data);
          return res.data.secure_url; 
        })
      );

      const finalData = { ...formData, ApartmentPictures: onlineUrls };

      // 3. إرسال البيانات للـ Backend بتاعك
      if (editingId) {
        // تحديث شقة قائمة
        const res = await API.put(`/apartments/${editingId}`, finalData, config); // 💡 هنا بعتنا finalData بدل formData
        if (res.status === 200) {
          setApartments((prev) =>
            prev.map((apt) => (apt._id === editingId ? res.data : apt))
          );
          toast.success('Apartment updated successfully!');
        }
      } else {
        // إضافة شقة جديدة
        const res = await API.post('/apartments', finalData, config);
        if (res.status === 201) {
          setApartments((prev) => [res.data, ...prev]);
          toast.success('Apartment added successfully!');
        }
      }
      
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
};

  const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this apartment?')) {
      try {
        const token = localStorage.getItem('userToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await API.delete(`/apartments/${id}`, config);
        if (res.status === 200) {
          setApartments((prev) => prev.filter((apt) => apt._id !== id));
          toast.success('Apartment deleted successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while deleting.');
      }
    }
  };

  const totalApartments = apartments.length;
  const activeListing = apartments.length;
  const totalReviews = apartments.length * 5;

  return (
    <div className={styles.dashboard}>

      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Owner Dashboard</h1>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Apartments</h2>
        <button className={styles.addBtn} onClick={() => handleOpenModal()}>
          + Add New Apartment
        </button>
      </div>

      {apartments.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🏠</div>
          <h3 className={styles.emptyTitle}>No Apartments Yet</h3>
          <p className={styles.emptyText}>
            Start by adding your first apartment listing. Click the button above to get started!
          </p>
        </div>
      ) : (
        <div className={styles.apartmentGrid}>
          {apartments.map((apartment) => (
            <div key={apartment._id} className={styles.apartmentCard}>
              <img
                src={apartment.ApartmentPictures?.[0] || '/src/assets/apt1.jpeg'}
                alt={apartment.City}
                className={styles.apartmentImage}
              />
              <div className={styles.apartmentCardBody}>
                <h3 className={styles.apartmentTitle}>{apartment.City}</h3>
                <p className={styles.apartmentLocation}>📍 {apartment.location}</p>

                <div className={styles.apartmentDetails}>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Number of Rooms</p>
                    <p className={styles.detailValue}>{apartment.NumberOfRooms}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Area</p>
                    <p className={styles.detailValue}>{apartment.Area}m²</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>View</p>
                    <p className={styles.detailValue}>{apartment.View}</p>
                  </div>
                </div>

                <p className={styles.apartmentPrice}>${apartment.price.toLocaleString()}/mo</p>

                <div className={styles.cardActions}>
                  <button
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => handleOpenModal(apartment)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(apartment._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Cards */}
      <div className={styles.statsContainer}>
        <div >
          <p className={styles.statLabel}>Total Apartments</p>
          <p className={styles.statValue}>{totalApartments}</p>
        </div>
        <div >
          <p className={styles.statLabel}>Active Listings</p>
          <p className={styles.statValue}>{activeListing}</p>
        </div>
        <div >
          <p className={styles.statLabel}>Total Reviews</p>
          <p className={styles.statValue}>{totalReviews}</p>
        </div>
      </div>






      {/* Modal */}
      {/* <div className={`${styles.modal} ${showModal ? styles.modalActive : ''}`}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>
              {editingId ? 'Edit Apartment' : 'Add New Apartment'}
            </h2>
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="City">
                City *
              </label>
              <input
                id="City"
                type="text"
                className={styles.input}
                name="City"
                value={formData.City}
                onChange={handleInputChange}
                placeholder="e.g., Cairo"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="location">
                Location *
              </label>
              <input
                id="location"
                type="text"
                className={styles.input}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Core"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="NumberOfRooms">
                  Number of Rooms *
                </label>
                <input
                  id="NumberOfRooms"
                  type="number"
                  className={styles.input}
                  name="NumberOfRooms"
                  value={formData.NumberOfRooms}
                  onChange={handleInputChange}
                  placeholder="2"
                  min="1"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="Area">
                  Area (m²) *
                </label>
                <input
                  id="Area"
                  type="number"
                  className={styles.input}
                  name="Area"
                  value={formData.Area}
                  onChange={handleInputChange}
                  placeholder="150"
                  min="1"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="View">
                  View *
                </label>
                <input
                  id="View"
                  type="text"
                  className={styles.input}
                  name="View"
                  value={formData.View}
                  onChange={handleInputChange}
                  placeholder="e.g., Sea View"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="price">
                  Price (per month) *
                </label>
                <input
                  id="price"
                  type="number"
                  className={styles.input}
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2500"
                  min="1"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your apartment..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="images">
                Apartment Images
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('images').click()}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  📸 Upload Images
                </button>
              </div>
              
              {formData.ApartmentPictures.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '10px',
                  marginBottom: '1rem'
                }}>
                  {imagePreviews.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                      <img
                        src={img}
                        alt={`apartment ${idx}`}
                        style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitBtn}>
                {editingId ? 'Update Apartment' : 'Add Apartment'}
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div> */}

      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        imagePreviews={imagePreviews}
      />
    </div>
  );
};

export default Dashboard;



  // [
  //   {
  //     id: 1,
  //     title: 'Luxury Downtown Apartment',
  //     location: 'Downtown Core',
  //     price: 2500,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     size: 850,
  //     description: 'Modern apartment with stunning city views',
  //     image: '/src/assets/apt1.jpeg',
  //   },
  //   {
  //     id: 2,
  //     title: 'Cozy Studio',
  //     location: 'North End',
  //     price: 1200,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     size: 450,
  //     description: 'Perfect for singles or couples',
  //     image: '/src/assets/apt2.jpeg',
  //   },
  //   {
  //     id: 3,
  //     title: 'Family House',
  //     location: 'Suburbs',
  //     price: 3500,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     size: 1500,
  //     description: 'Spacious home with garden',
  //     image: '/src/assets/apt3.jpeg',
  //   },
  // ]