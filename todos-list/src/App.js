import './App.css';
import Header from "./MyComponents/Header";
import {Todos} from "./MyComponents/Todos";
import {Footer} from "./MyComponents/Footer";
import React, { useState, useEffect } from 'react';
import {AddTodo} from './MyComponents/AddTodo';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {About} from './MyComponents/About';

function App() {
  let initTodo;
  if(localStorage.getItem("todos") === null){
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am ondelete todo", todo);
    // Deleting this way doesn't update the dom.
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  const addTodo = (title, desc) => {
    let sno;
    if(todos.length===0) {
      sno=0;
    }
    else {
      sno=todos[todos.length-1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }
  const [todos, setTodos] = useState([initTodo]);
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])
    // {
    //   sno: 1,
    //   title: "Go to the market",
    //   desc: "You need to go to the market to get this job done"
    // },
    // {
    //   sno: 2,
    //   title: "Go to the mall",
    //   desc: "You need to go to the market to get this job done"
    // },
    // {
    //   sno: 3,
    //   title: "Go to the ghat",
    //   desc: "You need to go to the market to get this job done"
    // }
  

  return (
    <>
      <Router>
        <Header title="MyTodosList" searchBar={false}/>
        <Routes>
            <Route exact path="/" element={
              <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
              </>}></Route>
            <Route exact path="/about" element={<About />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
