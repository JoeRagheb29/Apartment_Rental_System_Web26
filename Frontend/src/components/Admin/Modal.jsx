import styles from './Dashboard.module.css';

function Modal({ showModal, handleCloseModal, formData, handleInputChange, handleSubmit, editingId, imagePreviews, handleImageUpload, removeImage }) {
  return (
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
              <label className={styles.label} htmlFor="Title">
                Title *
              </label>
              <input
                id="Title"
                type="text"
                className={styles.input}
                name="Title"
                value={formData.Title}
                onChange={handleInputChange}
                placeholder="e.g., Modern Downtown Apartment"
              />
            </div>

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

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="floorNumber">
                  Floor Number *
                </label>
                <input
                  id="floorNumber"
                  type="number"
                  className={styles.input}
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleInputChange}
                  placeholder="3"
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="totalFloors">
                  Total Floors *
                </label>
                <input
                  id="totalFloors"
                  type="number"
                  className={styles.input}
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleInputChange}
                  placeholder="10"
                  min="1"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="amenities">
                Amenities (comma-separated)
              </label>
              <input
                id="amenities"
                type="text"
                className={styles.input}
                name="amenities"
                value={formData.amenities?.join(', ') || ''}
                onChange={(e) => {
                  const amenitiesArray = e.target.value.split(',').map(a => a.trim()).filter(a => a);
                  handleInputChange({ target: { name: 'amenities', value: amenitiesArray } });
                }}
                placeholder="e.g., AC, WiFi, Parking, Swimming Pool"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="petFriendly">
                <input
                  id="petFriendly"
                  type="checkbox"
                  name="petFriendly"
                  checked={formData.petFriendly || false}
                  onChange={(e) => handleInputChange({ target: { name: 'petFriendly', value: e.target.checked } })}
                  style={{ marginRight: '0.5rem' }}
                />
                Pet Friendly
              </label>
            </div>

            <div className={styles.formGroup}>
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
      </div>
  )
}

export default Modal
