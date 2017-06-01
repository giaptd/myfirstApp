/*global firebase*/

import React, { Component } from 'react';
import {ListGroup, ListGroupItem, FormGroup, FormControl, Button,
    Grid, Row, Col, Clearfix,InputGroup,} from 'react-bootstrap';

class Form extends Component{
    state = {
        todoText:'',
    }
    submitForm = (event)=>{
        event.preventDefault();
        // call main App submit event handler
        this.props.handleAddTodo({text: this.state.todoText});
        this.setState({todoText:''});
    }
    render(){
        return(
            <form type="submit" onSubmit={this.submitForm}>
                <InputGroup>
                    <FormControl type="text" value={this.state.todoText}
                                 onChange={(event)=>{this.setState({todoText: event.target.value})}}
                                 placeholder="input todo text"/>
                    <InputGroup.Button>
                        <Button type="submit">Add</Button>
                    </InputGroup.Button>
                </InputGroup>
            </form>
        );
    }
}

const Todo = (props)=>{
    return (
        <ListGroupItem href="#">
            <div style={{width:'91%', float:'left'}}>
                {props.text}
            </div>
            <div>
                <Button bsStyle="danger" bsSize="small"
                        onClick={props.deleteTodo.bind(null, props['.key'])}>Delete
                </Button>
            </div>
        </ListGroupItem>

    );
}


const Todos = (props)=>{

        return(
            <ListGroup>
                {props.todoList.map((todo,index)=><Todo {...todo} index={index} deleteTodo={props.deleteTodo}/>)}
            </ListGroup>
        );

}

// Next step: add boostrap, Firebase

class App extends Component {
    state = {
        todos:[],
    }

    componentWillMount = ()=>{
        this.firebaseRef = firebase.database().ref('todoApp/todos');
        this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
            var items = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                items.push(item);
            });

            this.setState({
                todos: items
            });
        }.bind(this));
    }

    componentWillUnmount = ()=>{
        this.firebaseRef.off();
    }

    deleteTodo = (key)=>{
        this.firebaseRef.child(key).remove();
    }
    handleAddTodo = (todo)=> {
        this.firebaseRef.push(todo);
    };

  render() {

    return (
      <div style={{margin:'5px'}}>
          <Form handleAddTodo = {this.handleAddTodo} />
          <div style={{marginBottom:'15px'}} />
          <Todos todoList = {this.state.todos} deleteTodo = {this.deleteTodo}/>
      </div>
    );
  }
}

export default App;
