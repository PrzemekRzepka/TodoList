import { View, Text, StyleSheet } from "react-native"
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

import { REMOVE_ITEM_TEXT } from "../../../shared/types/consts"

import Button from "./Button"

interface TodoItemProps {
    listId: string,
    id: string,
    text: string,
    isDone: boolean,
    onRemove: (listId: string, itemId: string) => void,
    onDone: (listId: string, itemId: string) => void
}


export default function TodoItem({ listId, id, text, isDone, onRemove, onDone }: TodoItemProps) {
    const styles = getStyles(isDone)

    return (
        <View style={styles.constainer}>
            <AdvancedCheckbox
                value={isDone}
                onValueChange={() => onDone(listId, id)}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.text, { fontSize: 20 }]}>{text}</Text>
            </View>
            <Button style={styles.button} title={REMOVE_ITEM_TEXT} onPress={() => onRemove(listId, id)} />
        </View>
    )

}

const getStyles = (isDone: boolean) => StyleSheet.create({
    constainer: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        marginVertical: 2,
        paddingHorizontal: 16,
        backgroundColor: isDone ? '#5a6069' : '#3b598a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'flex-start'

    },
    text: {
        color: isDone ? 'gray' : 'white'
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: '#a33737'

    }
})