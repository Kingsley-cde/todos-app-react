import { useState, useEffect, useMemo } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const completedcount = useMemo(() => {
    return todos.filter((element) => element.completed).length;
  }, [todos]);
  const addtodo = () => {
    let i = todos.length + 1;
    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: i.toString(),
        title: input,
        completed: false,
      }),
    }).then(() => {
      setTodos([
        ...todos,
        {
          id: i.toString(),
          title: input,
          completed: false,
        },
      ]);
      setInput("");
    });
  };
  function deletebutton(id) {
    fetch("http://localhost:8080/todos/" + id, { method: "DELETE" }).then(
      () => {
        const newRemove = todos.filter((element) => element.id !== id);
        setTodos(newRemove);
      }
    );
  }
  const checkboxChange = (id) => {
    const newTodo = todos.map((element) => {
      if (element.id === id)
        return {
          ...element,
          completed: !element.completed,
        };
      return element;
    });
    setTodos(newTodo);
  };
  function removebutton() {
    todos.forEach((element) => {
      fetch("http://localhost:8080/todos/" + element.id, {
        method: "DELETE",
      }).then(() => console.log("todo removed"));
    });

    setTodos([]);
  }
  function deletedonetasks() {
    const deleteDone = todos.filter((element) => !element.completed);
    setTodos(deleteDone);
  }
  function fetchdata() {
    fetch("http://localhost:8080/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="App">
      <h1>TodoInput</h1>
      <div class="addborder">
        <input
          type="text"
          placeholder="New Todo"
          className="todoinput"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="addbutton" onClick={addtodo}>
          Add new task
        </button>
      </div>
      <h2>TodoList</h2>
      <div className="button">
        <button className="eachbutton">All</button>
        <button className="eachbutton">Done</button>
        <button className="eachbutton">Todo</button>
      </div>
      <ul className="list">
        {todos.length > 0 ? (
          todos.map((element) => (
            <li key={element.id}>
              <div className="li">
                <p>{element.title}</p>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    className="check"
                    checked={element.completed}
                    onChange={() => checkboxChange(element.id)}
                  />
                  <button
                    className="delete"
                    onClick={() => deletebutton(element.id)}
                  >
                    <img src="/delete.png" alt="image" />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>No Available Tasks</h1>
        )}
        {/* <li>
          <div className="li">
            <p style={{ textDecoration: "line-through", color: "red" }}>
              Learn ReactJS basics
            </p>
            <div className="checkbox">
              <input type="checkbox" className="check" />
              <button className="delete">
                <img src="/delete.png" alt="image" />
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className="li">
            <p>Practice ReactJS</p>
            <div className="checkbox">
              <input type="checkbox" className="check" />
              <button className="delete">
                <img src="/delete.png" alt="image" />
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className="li">
            <p>Learn Redux</p>
            <div className="checkbox">
              <input type="checkbox" className="check" />
              <button className="delete">
                <img src="/delete.png" alt="image" />
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className="li">
            <p>Code portfolio in React</p>
            <div className="checkbox">
              <input type="checkbox" className="check" />
              <button className="delete">
                <img src="/delete.png" alt="image" />
              </button>
            </div>
          </div>
        </li>
        <li>
          <div className="li">
            <p>Learn React Native</p>
            <div className="checkbox">
              <input type="checkbox" className="check" />
              <button className="delete">
                <img src="/delete.png" alt="image" />
              </button>
            </div>
          </div>
        </li> */}
      </ul>
      <div className="deletebuttons">
        <button className="deleteb" onClick={deletedonetasks}>
          Delete done tasks
        </button>
        <button className="deleteb" onClick={removebutton}>
          Delete all tasks
        </button>
      </div>
      <p style={{ textAlign: "center" }}>
        number of completed tasks: {completedcount}
      </p>
    </div>
  );
}

export default Home;
