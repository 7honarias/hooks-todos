import React, { useContext, useState, useEffect } from 'react';
import { TodosContext } from './App';
import { Table, Form, Button } from 'react-bootstrap';
import useAPI from './useAPI';

function ToDoList(){
    const {state, dispatch} = useContext(TodosContext);
    const [todoText, setTodoText] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const buttonTitle = editMode ? "Edit" : "Add";

    const endpoint = "http://localhost3000/todos/"
    const savedTodos = useAPI(endpoint);

    useEffect(() => {
        dispatch({type: "get", payload: savedTodos});
    },[savedTodos])

    const handleSubmit = (event) => {
        event.preventDefault();
        if(editMode) {
            dispatch({type: 'edit', payload: {...editTodo, text:todoText}});
            setEditMode(false);
            setEditTodo(null);
        }
        else {
            dispatch({type: 'add', payload: todoText});
        }
        setTodoText("");
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Enter To Do"
                        onChange={event => setTodoText(event.target.value)}
                        value={todoText}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {buttonTitle}
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>To Do</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {state.todos.map(todo=>(
                    <tr key={todo.id}>
                        <td>{todo.text}</td>
                        <td onClick={() => {
                            setTodoText(todo.text)
                            setEditMode(true)
                            setEditTodo(todo)
                        }}>
                            Edit
                        </td>
                        <td onClick={() => 
                            dispatch({type:'delete', payload:todo})}>
                                Delete
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default ToDoList;