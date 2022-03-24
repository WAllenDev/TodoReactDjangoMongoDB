import React, { Component } from "react";

import axios from "axios";
import {
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Label,
  Input,
  UncontrolledCollapse
} from 'reactstrap';

import configData from "./app-config.json"

class App extends Component {

  constructor(props) {
    super(props);
    this.config = configData;
    axios.defaults.baseURL = this.config.baseUrl;
    this.state = {
      todoList: [],
      newTodoItem: {
        TodoTitle: "",
        Description: "",
        CreatedDate: "",
        IsCompleted: false
      }
    };
  }

  componentDidMount() {
    this.updateTodoList();
  }

  updateTodoList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  addTodoItem = (item) => {
    axios
      .post('/api/todos/', item)
      .then((res) => this.updateTodoList())
  };

  completeTodo = (item) => {
    axios
      .patch(`api/todos/${item.TodoItemId}/`, {
          IsComplete: true
        })
      .then( (res) => this.updateTodoList() );
  };

  deleteTodo = (item) => {
    axios
      .delete(`/api/todos/${item.TodoItemId}/`)
      .then( (res) => this.updateTodoList() );
  };

  handleFormChange = (e) => {
    let { name, value } = e.target;
    const newTodoItem = { ...this.state.newTodoItem, [name]: value };
    this.setState({ newTodoItem });
  };

  handleSubmit() {
    const newTodoItem = {
      TodoTitle: this.state.newTodoItem.TodoTitle,
      Description: this.state.newTodoItem.Description,
    }
    this.addTodoItem(newTodoItem);
  }

  renderItems = () => {
    const todoItems = this.state.todoList.filter(
      (item) => item.IsComplete === false
    );

    return todoItems.map((item) => (
      <li
        key = {item.TodoItemId}
        className = "list-group-item"
      >
        <div className="d-flex justify-content-between align-items-center">
          <span
            className="todo-title lead"
            title={item.Description}
            id={'collapseItem' + item.TodoItemId}

          >
            {item.TodoTitle}
          </span>
          <ButtonGroup>
            <Button
              className = "btn btn-success"
              onClick = { () => this.completeTodo(item) }
            >
              Done
            </Button>
            <Button
              className="btn btn-danger"
              onClick = { () => this.deleteTodo(item) }
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
        <UncontrolledCollapse toggler={'#collapseItem' + item.TodoItemId}>
          <p>{item.Description}</p>
        </UncontrolledCollapse>
      </li>
    ));
  };

  render() {
    return (
      <main className = "container">
        <h1 className = "text-white text-uppercase text-center my-4">Todo App</h1>
        <div className = "row">
          <div className = "col-md-6 col-sm-10 mx-auto p-0 my-2">
            <div className = "card p-3">
              <ul className = "list-group list-group-flush border-top-0">
                { this.renderItems() }
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0 my-2">
            <div className="card p-3">
              <Form onSubmit={() => this.handleSubmit() }>
                <FormGroup>
                  <Label for="todo-title" className="h3">Title</Label>
                  <Input
                    type="text"
                    id="todo-title"
                    name="TodoTitle"
                    value={this.state.newTodoItem.TodoTitle}
                    onChange={this.handleFormChange}
                    placeholder="Enter Todo Title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="to do-description" className="h3">Description</Label>
                  <Input
                    type="text"
                    id="todo-description"
                    name="Description"
                    value={this.state.newTodoItem.Description}
                    onChange={this.handleFormChange}
                    placeholder="Enter Todo Description"
                  />
                </FormGroup>
                <div className="d-grid">
                  <Button
                    color="success"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form>

            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default App;
