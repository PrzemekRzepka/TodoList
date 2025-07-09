import { View, TextInput, Button, StyleSheet } from "react-native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../slices/todo"


export default function NewItemInput() {
    const [itemText, setItemText] = useState<string>('')

    const dispatch = useDispatch()


    return (
        <View style={style.container}>
            <TextInput
                style={style.input}
                placeholder="To do task text"
                onChangeText={setItemText}
                value={itemText}
            />
            <View style={{ width: "20%" }}>
                <Button
                    title="ADD"
                    onPress={() => dispatch(addItem({ id: Date.now().toString(), text: itemText }))} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        gap: 16

    },
    input: {
        width: '100%',
        borderWidth: 1,
        color: "black"
    }
})