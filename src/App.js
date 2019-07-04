import React, { Component, useEffect, useState, useReducer, useContext } from 'react';
//import logo from './logo.svg';
import './App.css';

let todoItems=[{value: "abc", done: false}, {value:"def", done: true}];
const TodoContext = React.createContext();

function ShowHeader(props){

  const [time, setTime] = useState(new Date());

  useEffect( () => {
    const ti = setInterval( () => setTime(new Date()), 1000 );
    return () => clearInterval(ti);
  });

  return (
    <div className="text-blue">
        <h1 >Todo list</h1>
        <p>{time.toLocaleTimeString()}</p>
    </div>
  )
}

function TodoItem(props) {
  const context = useContext(TodoContext);

  const item = (props.item.done) ? (
    <li class="list-group-item list-group-item-action text-decor">
      <span onClick={() => { context.markTodo(parseInt(props.key1)) }}><i class="fas fa-check"></i></span> {props.item.value}
      <button type="button" onClick={() => { context.removeItem(parseInt(props.key1)) } } class='remove btn btn-default'><i class="fas fa-times"></i></button>         
    </li>
    ): (
    <li class="list-group-item list-group-item-action  text-green">
      <span onClick={() => { context.markTodo(parseInt(props.key1)) }}><i class="fas fa-check"></i></span> {props.item.value}
      <button type="button" onClick={() => { context.removeItem(parseInt(props.key1)) } } class='remove btn btn-default'><i class="fas fa-times"></i></button>         
    </li>
    )
  return item;
  
}

function TodoList(props){
  const listItems=props.listItem.map((items, index)=>
  <TodoItem item={items} key1={index} />
  );
  return(
    <ul className='list-group'>
      {listItems}
    </ul>
  )
  
}

function AddTodo(props){
  const [todoItem, setTodoItem] = useState({value: "", done: false});
  const context = useContext(TodoContext);

  return(
    <form className='form-main mt-30 form-inline' onSubmit={(e) => {
      context.addItem(todoItem.value);
      setTodoItem({value: "", done: false});
      e.preventDefault();
    }} >
      <input className='form-control' size='35' type="text" onChange={(e) => setTodoItem({
        value: e.target.value,
        done: false
      })} value={todoItem.value} placeholder="add a new todo..." />
      <button type='submit' class='btn btn-default'>Add</button>
    </form>
  )
  
}

function reducer(state, action){
  if (action.type==="add"){
    todoItems.unshift({value: action.item, done: false});
    return {todoItems: todoItems};
  }
  if (action.type==="delete"){
    todoItems.splice(action.index,1);
    return {todoItems: todoItems};
  }
  if (action.type==="markTodo"){
    let index=action.index;
      console.log(index);
      let don=todoItems[index].done;
      let val=todoItems[index].value;
      todoItems.splice(index,1);
      don ? todoItems.unshift({value: val, done: false}) : todoItems.push({value: val, done: true});
      return {todoItems: todoItems};
  }
}

function ShowContent(props){
  const [state, dispatch] = useReducer(reducer, {todoItems: props.todoItems});
  const func = {
    removeItem: (id) => dispatch({type: "delete", index: id}),
    markTodo: (id) => dispatch({type: "markTodo", index: id}),
    addItem: (todo) => dispatch({type: "add", item: todo}),
  }
    return (
      <div>
        <TodoContext.Provider value={func}>
        <TodoList listItem={props.todoItems} />
        <AddTodo/>
        </TodoContext.Provider>
      </div>
    )
}


function App() {
    return (
    <div class='container mt-50 main'>
      <ShowHeader />
      <ShowContent todoItems={todoItems} />
    </div>
  );
}

export default App;

