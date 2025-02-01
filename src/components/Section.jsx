import React from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import { Droppable } from "react-beautiful-dnd";
import "../styles/Section.css";

const Section = ({ section, tasks, addTask, deleteTask }) => {
  return (
    <div className="section">
      <h3>{section.title}</h3>
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
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddTask sectionId={section.id} addTask={addTask} />
    </div>
  );
};

export default Section;
