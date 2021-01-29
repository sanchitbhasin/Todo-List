import React, {Component} from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompleted = this.toggleCompleted.bind(this);
    }

    create(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    remove(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    update(id, newTask) {
        let newTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, task: newTask};
            }
            return todo;
        });
        this.setState({
            todos: newTodos
        });
    }

    toggleCompleted(id) {
        let newTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, done: !todo.done};
            }
            return todo;
        });
        this.setState({
            todos: newTodos
        });
    }

    render() {
        let todos = this.state.todos.map(todo => {
            return (
                <CSSTransition key={todo.id} timeout={500} classNames="todo">
                    <Todo 
                        key={todo.id} 
                        task={todo.task} 
                        id={todo.id}
                        done={todo.done}
                        toggleDone={this.toggleCompleted}
                        remove={this.remove} 
                        update={this.update}
                    />
                </CSSTransition>
            )
        });
        return (
            <div className="TodoList">
                <h1>
                    Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
                </h1>
                <NewTodoForm create={this.create}/>
                <ul>
                    <TransitionGroup className="todo-list">
                        {todos}
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}

export default TodoList;