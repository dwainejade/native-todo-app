import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [storageValue, updateStorage] = useAsyncStorage("todo-app", []);
    const [todos, setTodos] = useState(storageValue);

    useEffect(() => {
        setTodos(storageValue)
        // console.log('todos array changed', todos)
    }, [storageValue])

    const markComplete = (id) => {
        storageValue.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            // return todo;
        });
        updateStorage([...todos]);
    };

    const deleteTodo = (id) => {
        const newTodos = storageValue.filter((todo) => todo.id !== id)
        updateStorage(newTodos)
    };

    function useAsyncStorage(key, defaultValue) {
        const [storageValue, updateStorageValue] = useState(defaultValue);
        const [updated, setUpdated] = useState(false);

        async function getStorageValue() {
            let value = defaultValue;
            try {
                value = JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
                // console.log('1 getStorageValue:', value)
            } catch (e) {
                // console.log('catch error:', e);
            } finally {
                updateStorageValue(value);
                setUpdated(true);
                // console.log('2 getStorageValue finally:', value)
            }
        }

        async function updateStorage(newValue) {
            try {
                if (newValue === null) {
                    await AsyncStorage.removeItem(key);
                    // console.log('3 value is null', newValue);
                } else {
                    const value = JSON.stringify(newValue);
                    await AsyncStorage.setItem(key, value);
                    // console.log('4 value not null', value);
                }
            } catch (e) {
            } finally {
                setUpdated(false);
                getStorageValue();
                // console.log('5 updateStorage: updated', storageValue);
            }
        }

        useEffect(() => {
            getStorageValue();
            // console.log('6 useEffect: storageValue', storageValue)
        }, [updated]);

        return [storageValue, updateStorage];
    };

    return (
        <TodoContext.Provider value={[storageValue, updateStorage, markComplete, deleteTodo]}>
            {props.children}
        </TodoContext.Provider>
    );
};
