import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from "./TodoContext";
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const Todo = ({ todo }) => {
    const [storageValue, updateStorage, markComplete, deleteTodo] = useContext(TodoContext);
    const [input, setInput] = useState(todo.text);
    // const [isImportant, setIsImportant] = useState(false)

    const handleEdit = (todo) => {
        storageValue.map((t) => {
            if (t.edit) {
                t.edit = !t.edit;
            }
        });
        storageValue.map((t) => {
            if (t.id === todo.id) {
                todo.edit = !todo.edit;
            }
        });
        updateStorage([...storageValue]);
    };

    const handleSave = (todo) => {
        storageValue.map((t) => {
            if (t.id === todo.id) {
                todo.text = input;
                todo.edit = !todo.edit;
            }
        });
        updateStorage([...storageValue]);
        if (!todo.text) {
            deleteTodo(todo.id);
        }
    };

    const markImportant = (todo) => {
        let lastImportantIndex = -1;
        storageValue.splice(storageValue.indexOf(todo), 1);
        if (todo.important) {
            for (let i = 0; i < storageValue.length; i++) {
                if (storageValue[i].important) {
                    lastImportantIndex = i;
                }
                else {
                    break;
                }
            }
            todo.important = false;
            storageValue.splice(lastImportantIndex + 1, 0, todo);
        }
        else {
            todo.important = true;
            storageValue.unshift(todo);
        }
        updateStorage([...storageValue]);
    };

    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1)
    const itemHeight = useSharedValue(44)
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const TRANSLATEX_TRESHOLD = SCREEN_WIDTH * -.3;

    const asyncDelete = (id) => {
        setTimeout(() => {
            deleteTodo(id)
        }, 300);
    }

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
            // console.log(translateX.value);
        },
        onEnd: () => {
            const shouldDismiss = translateX.value < TRANSLATEX_TRESHOLD;
            if (shouldDismiss) {
                translateX.value = withTiming(-SCREEN_WIDTH)
                opacity.value = withTiming(0)
                runOnJS(asyncDelete)(todo.id)
                itemHeight.value = withTiming(0)
            } else {
                translateX.value = withTiming(0);
            }
        },
    });



    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = translateX.value < TRANSLATEX_TRESHOLD ? 1 : 0;
        return { opacity }
    });

    useEffect(() => {

    }, [input])

    return (
        <Animated.View >
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <MaterialIcons name="delete-outline" size={26} color="red" />
            </Animated.View>

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

                            {/* favorite/important button */}
                            <View style={styles.iconsRight}>
                                <TouchableOpacity
                                    onPress={() => markImportant(todo)}
                                >
                                    {todo.important ? (
                                        <MaterialIcons name="star" size={26} color="salmon" />
                                    ) : (
                                        <MaterialIcons name="star-outline" size={26} color="black" />
                                    )}

                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
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
        zIndex: 2
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
    iconContainer: {
        position: 'absolute',
        height: 44,
        width: 44,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        zIndex: -1
    },
})
