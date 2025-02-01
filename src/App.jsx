import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Section from './components/Section';
import AddSection from './components/AddSection';
import { saveData, loadData } from './utils/storage';
import './styles/App.css';

const App = () => {
  const [sections, setSections] = useState(loadData() || [
    { id: 'todo', title: 'Todo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ]);

  const [tasks, setTasks] = useState({});

  const addSection = (title) => {
    const newSection = { id: title.toLowerCase(), title };
    setSections([...sections, newSection]);
    saveData([...sections, newSection]);
  };

  const addTask = (sectionId, task) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks({ ...tasks, [sectionId]: [...(tasks[sectionId] || []), newTask] });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = {};
    Object.keys(tasks).forEach((sectionId) => {
      updatedTasks[sectionId] = tasks[sectionId].filter((task) => task.id !== taskId);
    });
    setTasks(updatedTasks);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = [...tasks[source.droppableId]];
    const [removed] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed);
      setTasks({ ...tasks, [source.droppableId]: sourceTasks });
    } else {
      const destinationTasks = [...(tasks[destination.droppableId] || [])];
      destinationTasks.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <AddSection addSection={addSection} />
        <div className="sections">
          {sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              tasks={tasks[section.id] || []}
              addTask={addTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;