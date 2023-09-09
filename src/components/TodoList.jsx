import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


function TodoList({server, token}) {

    const [todos, setTodos] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [todoEdit, setTodoEdit] = useState('');

    const todosAPI = `${server}/todos`;
    const getToDoAPI = `${server}/todos`;
    const addToDoAPI = `${server}/todos`;


    // if (token) {
    //     console.log("有token")
    // } else {
    //     console.log("沒token")

    const getTodo = async () => {
        try {
            const res = await axios.get(getToDoAPI, {
                    headers: {Authorization: token}
                }
            )
            console.log("get todo res===>", res);
            // console.log("get todo red===>", res.data.data);
            setTodos(res.data.data)
            setNewTodo('');
        } catch (error) {
            console.log("get to do error===>", error);
        }
    }
    
    const addTodo = async () => {
        if (!newTodo) return;
        const todoContent = {
            content: newTodo
        } 
        try {
            const res = await axios.post(addToDoAPI, todoContent, 
                {
                    headers: {Authorization: token}
                },
            )
            console.log("add to do res: ", res);
        } catch (error) {
            console.log("add to do error===>", error);
        }

        getTodo();
    }

    const deleteTodo = async (id) => {
        const deleteAPI = `${todosAPI}/${id}`;
        try {
            const res = await axios.delete(deleteAPI, {
                headers: {Authorization: token}
            });

            console.log('delete res===>', res);
        } catch (error) {
            console.log('delete error===>', error);
        }

        getTodo();
    }

    const updateTodo = async (id) => {
        const toDoAPI = `${server}/todos/${id}`;
        const todo = todos.find((todo) => todo.id === id);
        todo.content = todoEdit[id];

        try {
            await axios.put(toDoAPI, todo, {
                headers: {
                  Authorization: token,
                },
            });
            
        } catch (error) {
            console.log("update error====>", error);
        }
        getTodo();
        setTodoEdit({
            ...todoEdit,
            [id]: ''
        })
        
    }

    const toggleStatus = async(id) => {
        const toggleAPI = `${todosAPI}/${id}/toggle`;
        try {
            const res = await axios.patch(toggleAPI, {}, {
                headers: {Authorization: token}
            });
            console.log('status res===>', res);
        } catch (error) {
            console.log('status error===>', error);
        }

        getTodo();
    }

//    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiItTmRzTHZrczF3MjlZcG53ZVo4QSIsIm5pY2tuYW1lIjoiMTExMjIyIiwiaWF0IjoxNjk0MjM5NTM3LCJleHAiOjE2OTQ0OTg3Mzd9.hdTpdzK2BpybYyKPKFjxUUAl7BqAZjYjp7U91kE0QtY

    // function checkTodo() {
    //     // console.log("newTodo===>", newTodo);
    // }

    return(
        <>
            <h1>Todo list</h1>
            <input type="text" value={newTodo} placeholder="Add new todo" 
                   onChange={(e) => setNewTodo(e.target.value)}/>
            <button onClick={addTodo}>Add todo</button>
            <button onClick={getTodo}>Get todo</button>
                {todos && todos.map((todo, index) => (
                    <ul key={index}>
                        <li >
                            {todo.content} 
                            {todo.status ? '完成' : '未完成'} 
                            | 
                            {todoEdit[todo.id]
                        }
                        <input type="text" placeholder="更新資料" onChange={(e) => {
                            const newTodoEdit = {
                                ...todoEdit
                            }
                            newTodoEdit[todo.id] = e.target.value;
                            setTodoEdit(newTodoEdit)
                        }}/>
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => updateTodo(todo.id)}>Update</button>
                            <button onClick={() => toggleStatus(todo.id)}>Toggle status</button>


                        </li>
                    </ul>
                ))}


            {/* <button onClick={checkTodo}>檢查 todo</button> */}

        </>
    )
}


TodoList.propTypes = {
    server: PropTypes.string,
    token: PropTypes.string,
}


export default TodoList