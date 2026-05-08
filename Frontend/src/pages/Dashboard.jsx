import { useState } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [apartments, setApartments] = useState([
    {
      id: 1,
      title: 'Luxury Downtown Apartment',
      location: 'Downtown Core',
      price: 2500,
      bedrooms: 2,
      bathrooms: 2,
      size: 850,
      description: 'Modern apartment with stunning city views',
      image: '/src/assets/apt1.jpeg',
    },
    {
      id: 2,
      title: 'Cozy Studio',
      location: 'North End',
      price: 1200,
      bedrooms: 1,
      bathrooms: 1,
      size: 450,
      description: 'Perfect for singles or couples',
      image: '/src/assets/apt2.jpeg',
    },
    {
      id: 3,
      title: 'Family House',
      location: 'Suburbs',
      price: 3500,
      bedrooms: 4,
      bathrooms: 3,
      size: 1500,
      description: 'Spacious home with garden',
      image: '/src/assets/apt3.jpeg',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'size' 
        ? Number(value) 
        : value,
    }));
  };

  const handleOpenModal = (apartment = null) => {
    if (apartment) {
      setFormData(apartment);
      setEditingId(apartment.id);
    } else {
      setFormData({
        title: '',
        location: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        description: '',
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      description: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.price) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    if (editingId) {
      // Update apartment
      setApartments((prev) =>
        prev.map((apt) => (apt.id === editingId ? { ...formData, id: editingId } : apt))
      );
      setMessage({ type: 'success', text: 'Apartment updated successfully!' });
    } else {
      // Add new apartment
      const newApartment = {
        ...formData,
        id: Date.now(),
      };
      setApartments((prev) => [newApartment, ...prev]);
      setMessage({ type: 'success', text: 'Apartment added successfully!' });
    }

    setTimeout(handleCloseModal, 1000);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this apartment?')) {
      setApartments((prev) => prev.filter((apt) => apt.id !== id));
      setMessage({ type: 'success', text: 'Apartment deleted successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const totalApartments = apartments.length;
  const activeListing = apartments.length;
  const totalReviews = apartments.length * 5;

  return (
    <div className={styles.dashboard}>
      {message && (
        <div className={`${styles.messageContainer} ${styles[`${message.type}Message`]}`}>
          <span>{message.text}</span>
          <button
            className={styles.messageClose}
            onClick={() => setMessage(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Owner Dashboard</h1>
      </div>

      {/* Apartments Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Apartments</h2>
        <button className={styles.addBtn} onClick={() => handleOpenModal()}>
          + Add New Apartment
        </button>
      </div>

      {/* Apartments Grid or Empty State */}
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
            <div key={apartment.id} className={styles.apartmentCard}>
              <img
                src={apartment.image}
                alt={apartment.title}
                className={styles.apartmentImage}
              />
              <div className={styles.apartmentCardBody}>
                <h3 className={styles.apartmentTitle}>{apartment.title}</h3>
                <p className={styles.apartmentLocation}>📍 {apartment.location}</p>

                <div className={styles.apartmentDetails}>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Beds</p>
                    <p className={styles.detailValue}>{apartment.bedrooms}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Baths</p>
                    <p className={styles.detailValue}>{apartment.bathrooms}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Size</p>
                    <p className={styles.detailValue}>{apartment.size}m²</p>
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
                    onClick={() => handleDelete(apartment.id)}
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
      <div className={`${styles.modal} ${showModal ? styles.modalActive : ''}`}>
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
              <label className={styles.label} htmlFor="title">
                Apartment Title *
              </label>
              <input
                id="title"
                type="text"
                className={styles.input}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Modern Downtown Loft"
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
                <label className={styles.label} htmlFor="price">
                  Price ($/month) *
                </label>
                <input
                  id="price"
                  type="number"
                  className={styles.input}
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2500"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="bedrooms">
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  className={styles.input}
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="bathrooms">
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  className={styles.input}
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="2"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="size">
                  Size (m²)
                </label>
                <input
                  id="size"
                  type="number"
                  className={styles.input}
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="850"
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
      </div>
    </div>
  );
};

export default Dashboard;
