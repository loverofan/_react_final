import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


function TodoList({server, token}) {

    const [todos, setTodos] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [selectedTab, setSelectedTab] = useState("全部");

    const [unFinishTodo, setUnFinishTodo] = useState('');
    const [finishTodo, setFinishTodo] = useState('');
    const [todoEdit, setTodoEdit] = useState('');
    const [cookieValue, setCookieValue] = useState('');

    const todosAPI = `${server}/todos`;
    const getToDoAPI = `${server}/todos`;
    const addToDoAPI = `${server}/todos`;

    useEffect(() => {
        const newCookie = document.cookie
          .split(';')
          .find((row) => row.startsWith('hexschoolToken'))
          ?.split('=')[1];
          setCookieValue(newCookie)
          console.log("cookieValue===>", newCookie);
      }, []);

    useEffect(() => {
        getTodo();
    }, [cookieValue])

    const getTodo = async () => {
        try {
            const res = await axios.get(getToDoAPI, {
                    headers: {Authorization: cookieValue}
                }
            )
            console.log("get todo res===>", res);
            const todoData = res.data.data;
            setTodos(todoData);
            
            const unFinish = todoData.filter((todo) => todo.status === false);
            const finished = todoData.filter((todo) => todo.status === true);

            setUnFinishTodo(unFinish);
            setFinishTodo(finished);

        } catch (error) {
            // console.log("get to do error===>", error);
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
                    headers: {Authorization: cookieValue}
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
                headers: {Authorization: cookieValue}
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
                  Authorization: cookieValue,
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
                headers: {Authorization: cookieValue}
            });
            console.log('status res===>', res);
        } catch (error) {
            console.log('status error===>', error);
        }

        getTodo();
    }

    const clearCompletedTodos = async () => {
        const completedTodos = todos.filter((todo) => todo.status === true);
    
        if (completedTodos.length === 0) {
            alert("沒有已完成的項目需要清除。");
            return;
        }
    
        const completedTodoIds = completedTodos.map((todo) => todo.id);
    
        try {
            await Promise.all(completedTodoIds.map(async (id) => {
                const deleteAPI = `${todosAPI}/${id}`;
                await axios.delete(deleteAPI, {
                    headers: { Authorization: cookieValue },
                });
            }));
            console.log('已完成的項目已成功清除。');
        } catch (error) {
            console.log('清除已完成項目時發生錯誤：', error);
        }

        getTodo();
    }

    return(
        <>  
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" value={newTodo} placeholder="Add new todo" 
                            onChange={(e) => setNewTodo(e.target.value)}/>
                        <a onClick={addTodo}>
                            <li className="fa fa-plus">+</li>
                        </a>

                    </div>
                </div>   


                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li>
                            <a className={selectedTab === "全部" ? "active" : ""}
                               onClick={(e) => {
                                setSelectedTab("全部");
                               }}>全部</a>
                        </li>
                        <li>
                            <a className={selectedTab === "待完成" ? "active" : ""}
                               onClick={(e) => {
                                setSelectedTab("待完成");
                            }}>待完成</a>
                        </li>
                        <li>
                            <a className={selectedTab === "已完成" ? "active" : ""}
                               onClick={(e) => {
                                setSelectedTab("已完成");
                            }}>已完成</a>
                        </li>
                    </ul>
                    <div className="todoList-item">
                        <ul className="todoList_item" >
                            {todos && todos.map((todo, index) => {
                                if (selectedTab === "全部" || (selectedTab === "待完成" && !todo.status) || (selectedTab === "已完成" && todo.status)) {
                                    return (
                                        <li key={index}>
                                            <label className="todoList_label">
                                            <input className="todoList_input" checked={todo.status} type="checkbox" id={todo.id} 
                                                onChange={() => {toggleStatus(todo.id)}}/>
                                            </label>
                                            <span>{todo.content}</span>

                                            <input type="text" placeholder="更新資料" onChange={(e) => {
                                            const newTodoEdit = {
                                                ...todoEdit
                                                }
                                                newTodoEdit[todo.id] = e.target.value;
                                                setTodoEdit(newTodoEdit)
                                            }}/>
                                            <button className="btn" onClick={() => updateTodo(todo.id)}>更新</button>
                                            <button className="btn" onClick={() => toggleStatus(todo.id)}>已完成</button>
                                            <button className="btn" onClick={() => deleteTodo(todo.id)}>移除</button>
                                        </li>
                                    )
                                }

                            })
                        }
                        </ul>
                        <div className="todoList_statistics">
                            {todos.length == 0 ? <h2>尚無待辦事項</h2> : <p> {unFinishTodo.length} 尚待完成項目</p> }
                            {/* <p>{todos.length == 0 ? '尚無待辦事項' : '有'}</p> */}
                            {/* <p>{finishTodo.length} 個已完成項目</p> */}
                            <a onClick={clearCompletedTodos}>清除已完成項目</a>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


TodoList.propTypes = {
    server: PropTypes.string,
    token: PropTypes.string,
}


export default TodoList