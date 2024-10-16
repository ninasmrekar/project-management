import Tasks from "./Tasks.jsx";

function SelectedProject({
  selectedProject,
  onDeleteProject,
  onDeleteTask,
  onAddTask,
  tasks,
}) {
  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "ch-DE",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onDeleteProject(selectedProject.id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
        tasks={tasks.filter((task) => task.projectId === selectedProject.id)}
      />
    </div>
  );
}

export default SelectedProject;
