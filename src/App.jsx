import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Item from "../components/Item";
import Popup from "../components/Popup";

function App() {
  const initialTask = [
    {
      text: "Hacer la compra",
      done: false,
    },
    {
      text: "Lavar el coche",
      done: false,
    },
    {
      text: "Aprender React",
      done: false,
    },
  ];

  //Todo list
  const [task, setTask] = useState({});
  const [list, setList] = useState(initialTask);
  //Boton Add
  const [displayButton, setDisplayButton] = useState(false);
  //Popup
  const [displayPopup, setDisplayPopup] = useState(false);

  const createTask = (event) => {
    event.preventDefault();
    const text = event.target.text.value;
    event.target.text.value = "";
    const done = false;
    const task = { text, done };

    const confirmed = confirm(
      `¿Quieres añadir la tarea "${task.text} a la lista?`
    );
    if (confirmed) {
      setTask(task);
      setList([task, ...list]);
      setDisplayButton(false);
      showPopup();
    } else {
      alert("No se ha añadido la tarea");
    }
  };
  const deleteTask = (i) => {
    const remainingTasks = list.filter((task, index) => i !== index);
    setList(remainingTasks);
  };
  const clearTasks = () => {
    setList([]);
  };
  const resetTasks = () => {
    setList(initialTask);
  };
  const printList = () => {
    return list.map((task, i) => (
      <Item
        key={uuidv4()}
        text={task.text}
        deleteTask={() => deleteTask(i)}
        checkTask={() => checkTask(i)}
      />
    ));
  };
  //Boton Add
  const showButton = (event) => {
    event.preventDefault();
    if (event.target.value !== "") {
      setDisplayButton(true);
      setTimeout(() => {
        event.target.value = "";
        setDisplayButton(false);
      }, 20000);
    } else {
      setDisplayButton(false);
    }
  };

  //Popup
  const hidePopup = () => {
    setDisplayPopup(false);
  };
  const showPopup = () => {
    setDisplayPopup(true);
    setTimeout(() => {
      hidePopup();
    }, 5000);
  };
  const printPopup = () => {
    if (displayPopup) {
      return <Popup text={task.text} />;
    }
  };

  return (
    <>
      <h1>My ToDo List</h1>
      <form onSubmit={createTask}>
        <input
          onChange={showButton}
          type="text"
          name="text"
          id="text"
          placeholder="Add a task..."
        />
        {displayButton && (
          <button className="addbutton" type="submit">
            Add
          </button>
        )}
      </form>
      <br />
      <button onClick={resetTasks}>Reset ToDo List</button>
      <button onClick={clearTasks}>Clear ToDo List</button>
      <h3>ToDo List</h3>
      <section>{printList()}</section>
      <section>{printPopup()}</section>
    </>
  );
}

export default App;
