import AddSection from "./components/AddSection";
import Section from "./components/Section";
import { saveData, loadData } from "./utils/storage";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./styles/App.css";

const App = () => {
  const [sections, setSections] = useState(
    loadData()?.sections || [
      { id: "todo", title: "To do" },
      { id: "in-progress", title: "In Progress" },
      { id: "done", title: "Done" },
    ]
  );

  const [tasks, setTasks] = useState(
    loadData()?.tasks || {
      todo: [],
      "in-progress": [],
      done: [],
    }
  );

  // Save both sections and tasks to local storage
  const saveAppData = (updatedSections, updatedTasks) => {
    saveData({ sections: updatedSections, tasks: updatedTasks });
  };

  const addSection = (title) => {
    const newSection = { id: title.toLowerCase(), title };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    saveAppData(updatedSections, tasks);
  };

  const addTask = (sectionId, task) => {
    const newTask = { ...task, id: Date.now().toString() };
    const updatedTasks = {
      ...tasks,
      [sectionId]: [...(tasks[sectionId] || []), newTask],
    };
    setTasks(updatedTasks);
    saveAppData(sections, updatedTasks);
  };

  const updateTask = (taskId, updatedTask) => {
    const updatedTasks = { ...tasks };
    Object.keys(updatedTasks).forEach((sectionId) => {
      updatedTasks[sectionId] = updatedTasks[sectionId].map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      );
    });
    setTasks(updatedTasks);
    saveAppData(sections, updatedTasks);
  };

  const deleteSection = (sectionId) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    );
    setSections(updatedSections);

    const updatedTasks = { ...tasks };
    delete updatedTasks[sectionId];
    setTasks(updatedTasks);

    saveAppData(updatedSections, updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = {};
    Object.keys(tasks).forEach((sectionId) => {
      updatedTasks[sectionId] = tasks[sectionId].filter(
        (task) => task.id !== taskId
      );
    });
    setTasks(updatedTasks);
    saveAppData(sections, updatedTasks);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceTasks = [...tasks[source.droppableId]];
    const [removed] = sourceTasks.splice(source.index, 1);

    let updatedTasks = { ...tasks };

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed);
      updatedTasks[source.droppableId] = sourceTasks;
    } else {
      const destinationTasks = [...(tasks[destination.droppableId] || [])];
      destinationTasks.splice(destination.index, 0, removed);
      updatedTasks = {
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      };
    }

    setTasks(updatedTasks);
    saveAppData(sections, updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="sections">
          {sections.map((section) => (
            <Section
              key={section.id}
              section={section}
              tasks={tasks[section.id] || []}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              deleteSection={deleteSection}
            />
          ))}
          <AddSection addSection={addSection} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
