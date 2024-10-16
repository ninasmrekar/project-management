import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleClick() {
    if (title.trim() === "") {
      return;
    }
    onAddTask(title);
    setTitle("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={title}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
