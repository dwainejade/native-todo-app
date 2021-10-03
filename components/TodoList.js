import React, { useState, useContext } from 'react';
import { TodoContext } from "./TodoContext";
import Completed from './Completed';
import Todo from './Todo';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoList = () => {
    const [storageValue, updateStorage, markComplete, deleteTodo] = useContext(TodoContext);
    const [input, setInput] = useState('')

    const newTodo = (text) => {
        return { text, id: Date.now(), completed: false, edit: false, important: false };
    }

    const addTodo = (e) => {
        const text = input.trim();
        if (text) {
            updateStorage([...storageValue, newTodo(text)]);
        }
        setInput('');
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>TODO</Text>
            </View>
            <ScrollView style={styles.listContainer}>
                {storageValue.filter((todo) => todo.completed === false).map((todo) => <Todo todo={todo} key={todo.id} />)}
                <Completed />
            </ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.addItem} >
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Add Todo"
                        onSubmitEditing={addTodo}
                        placeholderTextColor='white'

                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={addTodo} disabled={!input} title='Add Todo'>
                        <MaterialIcons name="add" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default TodoList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    titleContainer:{
        width:'100%',
        backgroundColor:'rgba(0,0,0,.2)',
        paddingHorizontal: 4,

    },
    title: {
        fontSize: 30,
        color: '#FE5F55',
        fontWeight: '700',
        alignSelf: 'center',
    },
    listContainer: {
        // flex:1,
        width: "100%",
        // borderWidth: 2,
        // borderColor: 'skyblue',
        // margin: 6,
        // maxHeight: '85%',
        // padding: 2,
        // borderWidth:1
    },
    addItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%',
        // borderWidth:1
    },
    input: {
        flex: 1,
        height: 44,
        // margin: 4,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
        backgroundColor: '#222',
        opacity: .7,
        color: '#fff'
        // shadowColor: "#000",
        //     shadowOffset: {
        //         width: 0,
        //         height: 2,
        //     },
        //     shadowOpacity: 0.35,
        //     shadowRadius: .84,
        //     elevation: 5,
        //     color:'#fff'
    },
    button: {
        backgroundColor: '#00A7E1',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
