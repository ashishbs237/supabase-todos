import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { AppContext } from "../ContextProvider";

function Home() {
  const { user, logoutUser } = useContext(AppContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const { error } = await supabase
      .from("todos")
      .insert([{ title: newTodo, user_id: user.id }]);
    if (error) console.error(error);
    else {
      setNewTodo("");
      fetchTodos();
    }
  }

 async function handleAddEditToDo() {
    if (isEdit) {
      await editToDo();
    } else {
      await addTodo();
    }
  }

  async function toggleComplete(id, currentStatus) {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: !currentStatus })
      .eq("id", id);
    if (error) console.error(error);
    else fetchTodos();
  }

  async function editToDo(id, txt = "") {
    setIsEdit(true);
    setNewTodo(txt);
    const { error } = await supabase
      .from("todos")
      .update({ title: newTodo })
      .eq("id", id);
    if (error) console.error(error);
    else fetchTodos();
  }

  async function deleteTodo(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error(error);
    else fetchTodos();
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logoutUser();
  };

  return (
    <div className="px-4 py-8 max-w-xl mx-auto relative">
      {/* Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500  rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        Supabase Todo List
      </h1>

      <form
        onSubmit={handleAddEditToDo}
        className="flex items-center gap-2 mb-6"
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <span
              onClick={() => toggleComplete(todo.id, todo.is_complete)}
              className={`cursor-pointer ${
                todo.is_complete ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => editToDo(todo.id, todo.title)}
              className="text-sm text-silver-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
