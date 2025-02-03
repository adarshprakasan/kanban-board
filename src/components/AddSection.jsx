import styles from "../styles/AddSection";
import { useState } from "react";

const AddSection = ({ addSection }) => {
  const [sectionName, setSectionName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sectionName.trim()) {
      addSection(sectionName);
      setSectionName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button style={styles.mainbutton} onClick={() => setIsModalOpen(true)}>
        + Add Section
      </button>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Add New Section</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Section Name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                style={styles.input}
              />
              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.submitButton}>
                  Add Section
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSection;
