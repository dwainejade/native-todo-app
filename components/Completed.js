import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Todo from './Todo';
import { TodoContext } from './TodoContext';
import { Badge, List } from 'react-native-paper';

const Completed = () => {
    const [storageValue, updateStorage] = useContext(TodoContext);
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    const done = storageValue.filter(todo => todo.completed === true)

    return (
        <View>
            {done.length > 0 ?
                <View style={styles.accordianWrapper}>
                    <Badge style={styles.badge} >{done.length}</Badge>
                    <List.Accordion
                        style={styles.accordion}
                        title="Completed"
                        // left={props => <List.Icon {...props} />}
                        expanded={expanded}
                        onPress={handlePress}>
                        {done.map((todo) => <Todo todo={todo} key={todo.id} />)}
                    </List.Accordion>
                </View>
                : <></>
            }

            {/* <MaterialIcons name="chevron-right" size={24} color="black" /> */}
        </View>
    )
}

export default Completed

const styles = StyleSheet.create({
    accordianWrapper:{
        flex:1
    },
    accordion: {
        height: 34,
        padding: 0,
        backgroundColor: '#577590',
        paddingHorizontal: 15,
    },
    badge: {
        left: 100,
        top:28,
        alignSelf: 'flex-start',
        zIndex:2,
        fontSize:12,
        backgroundColor:'#444'
    }
})
