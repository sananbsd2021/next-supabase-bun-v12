"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Todo {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_completed: boolean;
}

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error("Error fetching todos: ", error);
      toast.error("Failed to fetch tasks.");
    } else {
      const sortedData = data?.sort(
        (a: Todo, b: Todo) => Number(a.is_completed) - Number(b.is_completed)
      );
      setTodoList(sortedData || []);
    }
    setLoading(false);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      toast.error("Todo title cannot be empty.");
      return;
    }

    setLoading(true);
    const newTodoData = { name: newTodo, is_completed: false };

    const response = await supabase.from("posts").insert([newTodoData]).single();
    if (response.error) {
      console.error("Error adding todo: ", response.error);
      toast.error("Failed to add todo.");
    } else {
      setTodoList((prev) => [...prev, response.data as Todo]);
      setNewTodo("");
      toast.success("Todo added successfully!");
    }
    setLoading(false);
  };

  const deleteTask = async (id: number) => {
    const prevList = [...todoList];
    setTodoList(prevList.filter((todo) => todo.id !== id));

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task: ", error);
      setTodoList(prevList);
      toast.error("Failed to delete task.");
    } else {
      toast.success("Task deleted successfully!");
    }
  };

  const completeTask = async (id: number, isCompleted: boolean) => {
    const { error } = await supabase
      .from("posts")
      .update({ is_completed: !isCompleted })
      .eq("id", id);

    if (error) {
      console.error("Error toggling task: ", error);
      toast.error("Failed to toggle task.");
    } else {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_completed: !isCompleted } : todo
        )
      );
      toast.success(`Task marked as ${!isCompleted ? "completed" : "incomplete"}.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="New Todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
        <button
          onClick={addTodo}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          Add Todo
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 border rounded"
          >
            <p className={`${todo.is_completed ? "line-through" : ""}`}>
              {todo.name}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => completeTask(todo.id, todo.is_completed)}
                className="text-white bg-green-500 px-4 py-1 rounded hover:bg-green-600"
              >
                {todo.is_completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
