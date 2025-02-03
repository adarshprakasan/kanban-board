import styles from "../styles/AddTask";
import { useState } from "react";

const TaskModal = ({ task, isEditing, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(
    task || {
      name: "",
      description: "",
      dueDate: "",
      assignee: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleChange}
            placeholder="Task Name"
            style={styles.input}
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            placeholder="Description"
            style={styles.input}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            placeholder="Due Date"
            style={styles.input}
          />
          <input
            type="text"
            name="assignee"
            value={editedTask.assignee}
            onChange={handleChange}
            placeholder="Assignee"
            style={styles.input}
          />
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.submitButton}>
              {isEditing ? "Save" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
