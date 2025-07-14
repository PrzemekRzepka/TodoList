import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

import { REMOVE_ITEM_TEXT } from "../../../shared/types/consts"

import { TodoItem as TodoItemProps } from "../../../shared/types/todoTypes";

import Button from "./Button"
import { TodoItem } from "../../../shared/types/todoTypes";


interface TodoListProps {
    id: string,
    title: string,
    createdAt: string,
    onRemove: (id: string) => void,
    onPress: () => void,
    items: TodoItemProps[],
}


export default function TodoList({ id, title, createdAt, onRemove, onPress }: TodoListProps

) {

    return (
        <TouchableOpacity style={styles.constainer} onPress={onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{createdAt}</Text>
                <Text style={[styles.text, { fontSize: 20 }]}>{title}</Text>
            </View>
            <Button style={styles.button} title={REMOVE_ITEM_TEXT} onPress={() => onRemove(id)} />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: '#3b598a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start'

    },
    text: {
        color: 'white'
    },
    button: {
        width: 40,
        height: 40,

    }
})