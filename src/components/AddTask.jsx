import styles from "../styles/AddTask";
import { useState } from "react";

const AddTask = ({ sectionId, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(sectionId, { name: taskName, description, dueDate, assignee });
      setTaskName("");
      setDescription("");
      setDueDate("");
      setAssignee("");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} style={styles.button}>
        + Add Task
      </button>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={styles.input}
              />
              <input
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.submitButton}>
                Add Task
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
