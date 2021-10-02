import React, { useState, createContext } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Walk 🐶 doggie",
            completed: false,
            edit: false
        },
        {
            id: 2,
            text: "Take shower",
            completed: false,
            edit: false,
            favorite: false
        },
        {
            id: 3,
            text: "Do homework 📚",
            completed: false,
            edit: false,
            favorite: false
        },
        {
            id: 4,
            text: "Create 👨🏾‍💻 some more",
            completed: false,
            edit: false,
            favorite: false
        },
    ]);

    const markComplete = (id) => {
        todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos([...todos]);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const favorite = (id) => {
        const todo = todos.find(element => element.id === id);
        let newTodos = todos.filter((todo) => todo.id !== id);
        newTodos.unshift(todo);
        setTodos(newTodos);
    };


    return (
        <TodoContext.Provider value={[todos, setTodos, markComplete, deleteTodo, favorite]}>
            {props.children}
        </TodoContext.Provider>
    );
};
