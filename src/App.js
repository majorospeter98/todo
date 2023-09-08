import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "dracula-ui/styles/dracula-ui.css";
import { Paragraph } from "dracula-ui";
function App() {
  let [deleted, setDeleted] = useState(false);
  let [active, setActive] = useState(false);
  let [toggle, setToggle] = useState(1);
  let [done, setDone] = useState(0);
  let [unDone, setUnDone] = useState(0);
  let [data, setData] = useState("");
  const [todos, setTodos] = useState(() => {
    const local = localStorage.getItem("items");
    if (local === null) return [];
    return JSON.parse(local);
  });
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);
  function handleSubmit(e) {
    e.preventDefault();
    if (data.length != 0)
      setTodos((current) => {
        return [
          ...current,
          { id: crypto.randomUUID(), title: data, completed: false },
        ];
      });
    setData("");
  }
  let openlength = todos.filter((todo) => {
    if (todo.completed) {
      return todo;
    }
  });
  let completedlength = todos.filter((todo) => {
    if (!todo.completed) {
      return todo;
    }
  });
  function donehandle(id) {
    setTodos((current) => {
      return current.map((todo) => {
        if (todo.id === id) {
          setActive(true);
          setTimeout(() => {
            setActive(false);
          }, 2000);
          return { ...todo, completed: true };
        }
        return todo;
      });
    });
  }
  function unDoneHandle(id) {
    setTodos((current) => {
      return current.map((todo) => {
        if (todo.id === id) {
          setUnDone(true);
          setTimeout(() => {
            setUnDone(false);
          }, 2000);
          return { ...todo, completed: false };
        }
        return todo;
      });
    });
  }
  function updateToggle(id) {
    setToggle(id);
  }
  function deleteHandle(id) {
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 2000);
    setTodos((current) => {
      return current.filter((todo) => todo.id !== id);
    });
  }
  return (
    <body>
      <main>
        <div className="container">
          <div className="up">
            <h3 className={active ? "completed" : "no-completed"}>
              ✓ Completed
            </h3>
            <h3 className={deleted ? "deleted" : "no-completed"}>X Deleted </h3>
            <h3 className={unDone ? "undone" : "no-completed"}>✓ Undone </h3>
            <h1 className="drac-text-purple-cyan">
              You have {todos.length} task.
            </h1>
            <ul className="drac-tabs drac-tabs-pink">
              <li onClick={() => updateToggle(1)}>
                Open ({completedlength.length})
              </li>
              <li onClick={() => updateToggle(2)}>
                Completed ({openlength.length})
              </li>
            </ul>
          </div>
          <div className="gap">
            <div className={toggle === 1 ? "show" : "close"}>
              {todos.map((todos) => {
                if (!todos.completed)
                  return (
                    <div key={todos.id}>
                      <div className="flex">
                        <div>
                        <p class="flex-p"> {todos.title} </p>
                        </div>
                        <div className="group">
                        <button
                          className="drac-btn"
                          size="xs"
                          onClick={() => donehandle(todos.id)}
                        >
                          Done
                        </button>
                        <button
                          onClick={() => deleteHandle(todos.id)}
                          className="drac-btn list"
                        >
                          Delete
                        </button>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
          <div className={toggle === 2 ? "show" : "close"}>
            {todos.map((todos) => {
              if (todos.completed)
                return (
                  <div key={todos.id}>
                    <div className="flex">
                      {todos.title}
                      <button
                        className="divide drac-btn"
                        onClick={() => unDoneHandle(todos.id)}
                      >
                        unDone
                      </button>
                      <button
                        onClick={() => deleteHandle(todos.id)}
                        className="drac-btn divide"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="input"> </label>
            <input
              type="text"
              placeholder="Add task"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="drac-input drac-text-white"
              id="input"
            ></input>
            <button className="drac-btn drac-border-green drac-text-red drac-bg-purple">
              +
            </button>
          </form>
        </div>
      </main>
    </body>
  );
}
export default App;
