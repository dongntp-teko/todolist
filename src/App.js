import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

var todoItems=[{value: "abc", done: false}, {value:"def", done: true}];

function ShowHeader(props){
  return (
    <div class='text-blue'>
        <h1>Todo list</h1>
    </div>
  )
}

class TodoItem extends React.Component{
  constructor(props){
    super(props);
    this.handleRemove=this.handleRemove.bind(this);
  }

  handleRemove(){
    //this.props.removeItem(parseInt(this.props.key));
    alert(this.props.key);
  }

  render(){
    const item = (this.props.item.done) ? (
      <li class="list-group-item list-group-item-action text-decor">
        <i class="fas fa-check"></i> {this.props.item.value}
        <button type="button" onClick={this.handleRemove} class='remove btn btn-default'><i class="fas fa-times"></i></button>         
      </li>
    ): (
      <li class="list-group-item list-group-item-action  text-green">
        <i class="fas fa-check"></i> {this.props.item.value}
        <button type="button" onClick={this.handleRemove} class='remove btn btn-default'><i class="fas fa-times"></i></button>         
      </li>
    )
    return item;
  }
}

class TodoList extends React.Component{
  render(){  
    const listItems=this.props.listItem.map((items, index)=>
    <TodoItem item={items} key={index} removeItem={this.props.removeItem} />
  );
    return(
      <ul className='list-group'>
        {listItems}
      </ul>
    )
  }
}

class AddTodo extends React.Component{
  constructor(props){
    super(props);
    this.state={value:"", done: false};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value});
  }

  handleSubmit(event){
    this.props.addItem(this.state.value);
    this.setState({value:"", done:false});
    event.preventDefault();
  }

  render(){
    return(
      <form className='form-main mt-30 form-inline' >
        <input className='form-control' size='35' type="text" onChange={this.handleChange} value={this.state.value} placeholder="add a new todo..." />
        <button type='submit' onClick={this.handleSubmit} class='btn btn-default'>Add</button>
      </form>
    )
  }
}

class ShowContent extends React.Component{
  constructor(props){
    super(props);
    this.addItem=this.addItem.bind(this);
    this.state={todoItems: todoItems};
  }

  addItem(item){
    todoItems.unshift({value: item, done: false});
    this.setState({todoItems: todoItems});
  }

  removeItem(index){
    todoItems.slice(index);
    this.setState({todoItems: todoItems});
  }

  render(){
    return (
      <div>
        <TodoList listItem={this.props.todoItems} removeItem={this.removeItem} />
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

