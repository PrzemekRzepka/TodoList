import { View, TextInput, StyleSheet } from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"

import Button from "./Button"
import { addItem } from "../slices/todo"
import { ADD_TEXT, TEXT_INPUT_PLACEHOLDER_TEXT } from "../../../shared/types/consts"

interface NewItemInputProps {
    listId: string
}

export default function NewItemInput({ listId }: NewItemInputProps) {
    const [itemText, setItemText] = useState<string>('')

    const dispatch = useDispatch()

    function handleAddingItem() {
        if (itemText.trim()) {
            dispatch(addItem({
                listId: listId, item: {
                    id: Date.now().toString(),
                    text: itemText,
                    isDone: false,
                    createdAt: new Date(Date.now()).toLocaleString()
                }
            }))
            setItemText('');
        } else {
            //TODO add dialog box
            console.log('Empty note!');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={TEXT_INPUT_PLACEHOLDER_TEXT}
                onChangeText={setItemText}
                value={itemText}
                placeholderTextColor="#ccc"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title={ADD_TEXT}
                    onPress={handleAddingItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        gap: 12,
        paddingBottom: 46,
        paddingTop: 16,
        paddingHorizontal: 20,
        backgroundColor: '#2e466e'

    },
    buttonContainer: {
        width: "20%",
        alignSelf: 'flex-end'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        color: "white",
        backgroundColor: "#3b598a",
        borderRadius: 10,

    }
})