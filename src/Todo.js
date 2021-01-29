import React, {Component} from 'react';
import './Todo.css';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            task: this.props.task
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }
    handleClick() {
        this.setState({isEditing: !this.state.isEditing});
    }
    handleRemove() {
        this.props.remove(this.props.id);
    }
    handleUpdate(e) {
        e.preventDefault();
        this.props.update(this.props.id, this.state.task);
        this.setState({isEditing: false});
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDone() {
        this.props.toggleDone(this.props.id);
    }

    render() {
        let result;
        if(this.state.isEditing) {
            result = (
                <CSSTransition key='editing' timeout={500} classNames='form'>
                    <form onSubmit={this.handleUpdate}>
                        <input type="text" name="task" value={this.state.task} onChange={this.handleChange}/>
                        <button>Save</button>
                    </form>
                </CSSTransition>
            );
        } else {
            result = (
                <CSSTransition key='normal' timeout={500} classNames='task-text'>
                    <li className="Todo-task" onClick={this.handleDone}>{this.props.task}</li>
                </CSSTransition>
            );
        }
        return (
            <TransitionGroup className={this.props.completed ? "Todo completed" : "Todo"}>
                {result}
                <div className="Todo-buttons">
                    <button onClick={this.handleClick}>
                        {/* <i className='fas fa-pen' /> */}
                        <div>Edit</div>
                    </button>
                    <button onClick={this.handleRemove}>
                        {/* <i className='fas fa-trash' /> */}
                        <div>X</div>
                    </button>
                </div>
            </TransitionGroup>
        );
    }
}

export default Todo;