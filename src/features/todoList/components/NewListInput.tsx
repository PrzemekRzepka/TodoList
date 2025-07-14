import { View, TextInput, StyleSheet } from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"

import Button from "./Button"
import { addItem, addList } from "../slices/todo"
import { ADD_TEXT, NEW_LIST_INPUT_PLACEHOLDER_TEXT } from "../../../shared/types/consts"


export default function NewListInput() {
    const [listTitle, setlistTitle] = useState<string>('')

    const dispatch = useDispatch()

    function handleAddingList() {
        if (listTitle.trim()) {
            dispatch(addList({
                id: Date.now().toString(),
                title: listTitle,
                createdAt: new Date(Date.now()).toLocaleString()
            }))
            setlistTitle('');
        } else {
            //TODO add dialog box
            console.log('Empty note!');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={NEW_LIST_INPUT_PLACEHOLDER_TEXT}
                onChangeText={setlistTitle}
                value={listTitle}
                placeholderTextColor="#ccc"
            />
            <View style={styles.buttonContainer}>
                <Button
                    title={ADD_TEXT}
                    onPress={handleAddingList} />
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