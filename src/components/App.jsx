import { useState } from "react";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";
import Sidebar from "./Sidebar";

let newProjectID = 0;

function App() {
  const [action, setAction] = useState("start");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(undefined);

  function handleAddTask(text) {
    setTasks((prevTasks) => {
      const newTask = {
        text: text,
        projectId: selectedProject.id,
      };

      return [...prevTasks, newTask];
    });
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task, index) => index !== id);
    });
  }

  function handleCreateProject() {
    setAction("create-project");
    setSelectedProject(undefined);
  }

  function handleCancelProject() {
    setAction("start");
    setSelectedProject(undefined);
  }

  function handleSaveProject(title, description, dueDate) {
    setProjects((prevProjects) => {
      const newProject = {
        id: newProjectID,
        title: title,
        description: description,
        dueDate: dueDate,
      };
      return [...prevProjects, newProject];
    });
    newProjectID++;
    setAction("start");
    setSelectedProject(undefined);
  }

  function handleSelectProject(id) {
    const selectedProject = projects.find((project) => project.id === id);

    setSelectedProject({
      id: id,
      title: selectedProject.title,
      description: selectedProject.description,
      dueDate: selectedProject.dueDate,
    });
    setAction("select-project");
  }

  function handleDeleteProject(id) {
    setProjects((prevProjects) => {
      return prevProjects.filter((project) => project.id !== id);
    });
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.projectId !== id);
    });
    setAction("start");
    setSelectedProject(undefined);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onCreateProject={handleCreateProject}
        projects={projects}
        onSelectProject={handleSelectProject}
        selectedProject={selectedProject}
      />
      {action === "create-project" && (
        <NewProject
          onCancelProject={handleCancelProject}
          onSaveProject={handleSaveProject}
        />
      )}
      {action === "start" && (
        <NoProjectSelected onCreateProject={handleCreateProject} />
      )}
      {action === "select-project" && (
        <SelectedProject
          onDeleteProject={handleDeleteProject}
          selectedProject={selectedProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={tasks}
        />
      )}
    </main>
  );
}

export default App;
