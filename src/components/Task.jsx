import TaskModal from "./TaskModal";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/Task.css";

const Task = ({ task, index, deleteTask, updateTask }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleSave = (updatedTask) => {
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const isPastDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card"
        >
          <div className="task-header">
            <h4>{task.name}</h4>
            <div
              className="more-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>...</span>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className="task-details">
            <div className="task-misc">
              <p>{task.assignee}</p>
              <p
                className="task-date"
                style={{
                  color: isPastDue(task.dueDate) ? "red" : "green",
                }}
              >
                {task.dueDate}
              </p>
            </div>
            <div className="task-desc">
              <p>{task.description}</p>
            </div>
          </div>

          {isEditing && (
            <TaskModal
              task={task}
              isEditing={true}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
