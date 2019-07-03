import React, { Component, useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';

let todoItems=[{value: "abc", done: false}, {value:"def", done: true}];

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

  const item = (props.item.done) ? (
    <li class="list-group-item list-group-item-action text-decor">
      <span onClick={() => { props.markTodo(parseInt(props.key1)) }}><i class="fas fa-check"></i></span> {props.item.value}
      <button type="button" onClick={() => { props.removeItem(props.key1) } } class='remove btn btn-default'><i class="fas fa-times"></i></button>         
    </li>
    ): (
    <li class="list-group-item list-group-item-action  text-green">
      <span onClick={() => { props.markTodo(parseInt(props.key1)) }}><i class="fas fa-check"></i></span> {props.item.value}
      <button type="button" onClick={() => { props.removeItem(props.key1) } } class='remove btn btn-default'><i class="fas fa-times"></i></button>         
    </li>
    )
  return item;
  
}

function TodoList(props){
  const listItems=props.listItem.map((items, index)=>
  <TodoItem item={items} key1={index} markTodo={props.markTodoDone} removeItem={props.removeItem} />
  );
  return(
    <ul className='list-group'>
      {listItems}
    </ul>
  )
  
}

function AddTodo(props){
  const [todoItem, setTodoItem] = useState({value: "", done: false});

  return(
    <form className='form-main mt-30 form-inline' onSubmit={(e) => {
      props.addItem(todoItem.value);
      e.preventDefault();
    //console.log(todoItems)
    }} >
      <input className='form-control' size='35' type="text" onChange={(e) => setTodoItem({
        value: e.target.value,
        done: false
      })} value={todoItem.value} placeholder="add a new todo..." />
      <button type='submit' class='btn btn-default'>Add</button>
    </form>
  )
  
}

class ShowContent extends React.Component{
  constructor(props){
    super(props);
    this.addItem=this.addItem.bind(this);
    this.markTodoDone=this.markTodoDone.bind(this);
    this.removeItem=this.removeItem.bind(this);
    this.state={todoItems: todoItems};
  }

  addItem(item){
    if(item) todoItems.unshift({value: item, done: false});
    this.setState({todoItems: todoItems});
  }

  removeItem(index){
    todoItems.splice(index,1);
    this.setState({todoItems: todoItems});
  
  }

  markTodoDone(index){
    var don=todoItems[index].done;
    var val=todoItems[index].value;
    todoItems.splice(index,1);
    don ? todoItems.unshift({value: val, done: false}) : todoItems.push({value: val, done: true});
    this.setState({todoItems: todoItems});
   // alert(index);
  }

  render(){
    return (
      <div>
        <TodoList listItem={this.props.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone} />
        <AddTodo addItem={this.addItem}/>
      </div>
    )
  }
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

