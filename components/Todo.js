import React, { useContext, useState } from 'react'
import { TodoContext } from "./TodoContext";
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Todo = ({ todo }) => {
    const [todos, setTodos, markComplete, deleteTodo, favorite] = useContext(TodoContext);
    const [input, setInput] = useState(todo.text);

    const handleEdit = (todo) => {
        todos.map((t) => {
            if (t.edit) {
                todo.edit = !todo.edit;
                handleSave(t);
            }
        });
        todos.map((t) => {
            if (t.id === todo.id) {
                todo.edit = !todo.edit;
            }
        });
        setTodos([...todos]);
        return todo
    };

    const handleSave = (todo) => {
        todos.map((t) => {
            if (t.id === todo.id) {
                todo.text = input;
                todo.edit = !todo.edit;
            }
        });
        setTodos([...todos]);
        if (!todo.text) {
            deleteTodo(todo.id);
        }
    };

    const translateX = useSharedValue(0)

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            translateX.value = withTiming(0);
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const LIST_ITEM_HEIGHT = 70

    return (
        <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[styles.card, rStyle]}>
                {/* if a todo is being edited it will display as an TextInput */}
                {todo.edit ? (
                    <View >
                        <TextInput
                            style={styles.editInput}
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={() => handleSave(todo)}
                            autoFocus={true}
                        />
                        <TouchableOpacity
                            onPress={() => handleSave(todo)}
                        >
                            {/* <MaterialCommunityIcons name="content-save-outline" size={24} color="black" /> */}
                        </TouchableOpacity>
                    </View>

                ) : (

                    // if todo is completed it will display as a checked icon 
                    <View style={styles.container}>

                        <TouchableOpacity onPress={() => markComplete(todo.id)}>
                            {
                                todo.completed ?
                                    <MaterialIcons name="check-circle-outline" size={26} color="black" />
                                    :
                                    <MaterialIcons name="radio-button-unchecked" size={26} color="black" />
                            }
                        </TouchableOpacity>

                        {/* pressing a todo will trigger handleEdit */}
                        <TouchableOpacity
                            style={styles.textWrapper}
                            onPress={() => handleEdit(todo)}
                        >
                            <Text style={styles.text}>{todo.text}</Text>
                        </TouchableOpacity>

                        {/* delete button */}
                        <View style={styles.iconsRight}>
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => deleteTodo(todo.id)}
                            >
                                {
                                    todo.favorite ?
                                        <MaterialIcons name="delete-ouline" size={26} color="salmon" />
                                        :
                                        <MaterialIcons name="delete-outline" size={26} color="black" />
                                }
                                {/* <MaterialIcons name="star-outline" size={24} color="black" /> */}
                            </TouchableOpacity>
                        </View>
            <View style={styles.iconContainer}>

            </View>
                    </View>
                )}
            </Animated.View>
        </PanGestureHandler>
    )
}

export default Todo

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 5,
        margin: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: .84,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        width: '96%',
        fontSize: 20,
        alignItems: 'center',
        // alignSelf: 'center',
        margin: 8
    },
    textWrapper: {
        flex: 10,
        marginLeft: 8,
    },
    text: {
        fontSize: 20,
    },
    editInput: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        padding: 4,
        margin: 4,
        fontSize: 20
    },
    iconContainer:{
        position:'absolute',
        height: 44,
        backgroundColor:'red',
        justifyContent:'center',
        // alignItems:'center',
        right:0
    }
})
