import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewTodoForm.css';

class NewTodoForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.create({...this.state, id: uuidv4(), done: false});
        this.setState({
            task: ''
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="NewTodoForm">
                <label htmlFor="task">New Todo</label>
                <input 
                    id="task" 
                    placeholder="New Todo"
                    type="text" 
                    value={this.state.task}
                    name="task" 
                    onChange={this.handleChange}
                />
                <button>Add Todo</button>
            </form>
        );
    }
}

export default NewTodoForm;