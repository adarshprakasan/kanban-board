import AddTask from "./AddTask";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "../styles/Section.css";
import { useState } from "react";

const Section = ({
  section,
  tasks,
  addTask,
  updateTask,
  deleteTask,
  deleteSection,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDelete = () => {
    deleteSection(section.id);
  };

  return (
    <div className="section-main">
      <div className="section-heading">
        <h3>{section.title}</h3>
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
      <div className="section-List">
        <Droppable droppableId={section.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="task-list"
            >
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddTask sectionId={section.id} addTask={addTask} />
      </div>
    </div>
  );
};

export default Section;
