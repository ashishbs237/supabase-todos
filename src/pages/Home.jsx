import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

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
    const { error } = await supabase.from("todos").insert([{ title: newTodo }]);
    if (error) console.error(error);
    else {
      setNewTodo("");
      fetchTodos();
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

  async function deleteTodo(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.error(error);
    else fetchTodos();
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Supabase Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ padding: "0.5rem", width: "80%" }}
        />
        <button type="submit" style={{ padding: "0.5rem" }}>
          Add
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => toggleComplete(todo.id, todo.is_complete)}
              style={{
                textDecoration: todo.is_complete ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
