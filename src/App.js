import { useState, useEffect } from "react";

import "./App.css";
//localstorage

function App() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);
  const [inputData, setInputData] = useState("");
  const [selectData, setSelectData] = useState("");
  const [selectedData, setSelectedData] = useState("All");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({
    input: false,
    select: false,
  });

  const addTodo = () => {
    if (!inputData && !selectData) {
      setStatus({
        input: true,
        select: true,
      });
    } else if (!inputData) {
      setStatus({
        input: true,
        select: false,
      });
    } else if (!selectData) {
      setStatus({
        input: false,
        select: true,
      });
    } else if (inputData.length < 3) {
      console.log(inputData.length);
      setStatus({
        input: true,
        select: false,
      });
    } else {
      setList([
        ...todos,
        {
          name: inputData,
          status: selectData,
        },
      ]);
      setTodos((list) => [
        ...list,
        {
          name: inputData,
          status: selectData,
        },
      ]);

      setInputData("");
      setSelectData("");
      setStatus({
        input: false,
        select: false,
      });
    }
  };
  const changeSelect = (e) => {
    setSelectData(e.target.value);
    setStatus((status) => ({
      ...status,
      select: false,
    }));
  };

  useEffect(() => {
    if (todos?.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await localStorage.getItem("todos");
    const newData = JSON.parse(data);
    setTodos(newData || []);
    setList(newData || []);
  };

  useEffect(() => {
    console.log({ selectedData });
    let newList = [];
    if (selectedData === "All") {
      newList = todos.filter((x) => x.name.indexOf(search) > -1);
    } else {
      newList = todos.filter((x) => x.status === selectedData);
      newList = newList.filter((x) => x.name.indexOf(search) > -1);
    }

    setList(newList);
  }, [selectedData, search, todos]);

  const deleteItem = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  return (
    <div className="App">
      <img src="img.png" alt="hata"></img>
      <hr />
      <h1>Create New Jop</h1>
      <div className="od_wrapper">
        <div className="od_list">
          <h3 className="od_title"> Jop Name</h3>
        </div>
        <div className="od_list">
          <h3 className="od_tit"> Jop Priority</h3>
        </div>
      </div>

      <div className="header">
        <input
          className={status.input ? "alertİnput" : ""}
          type="text"
          required
          maxLength={"255"}
          value={inputData || ""}
          onChange={(e) => setInputData(e.target.value)}
        />

        <select
          className={status.select ? "alert" : ""}
          value={selectData}
          onChange={(e) => changeSelect(e)}
        >
          <option value="Choose">Choose </option>
          <option value="Urgent">Urgent </option>
          <option value="Regular">Regular</option>
          <option value="Trivial">Trivial </option>
        </select>
        <button onClick={addTodo}>Create</button>
      </div>

      <h4>Jop List</h4>

      <div className="opn d-flex gap-2 ">
        <input
          type="text"
          placeholder="Jop Name"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={status.select ? "alert" : ""}
          value={selectData}
          onChange={(e) => setSelectedData(e.target.value)}
        >
          <option value="All">Priority(all)</option>
          <option value="Urgent">Urgent </option>
          <option value="Regular">Regular</option>
          <option value="Trivial">Trivial </option>
        </select>
      </div>
      <div className="tli">
        <div> Name</div>
        <div>Priority</div>
        <div>Action</div>
      </div>

      <ul className="list ">
        {list.map((todo, index) => (
          <li key={"list_" + index}>
            <span>{todo.name}</span>
            <div style={{ textAlign: "center" }}>
              <strong
                className={
                  todo.status === "Urgent"
                    ? "status1"
                    : todo.status === "Regular"
                    ? "status2"
                    : "status3"
                }
              >
                {todo.status}
              </strong>
            </div>
            <div style={{ textAlign: "end" }}>
              <button onClick={() => deleteItem(index)}>x</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
