import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../styles/Task.css";

const Task = ({ task, index, deleteTask }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
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
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className="task-details">
            <div className="task-misc">
              <p>{task.assignee}</p>
              <p>{task.dueDate}</p>
            </div>
            <div className="task-desc">
              <p>{task.description}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
