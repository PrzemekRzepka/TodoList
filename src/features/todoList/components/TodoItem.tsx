import { View, Button, Text, StyleSheet } from "react-native"
import { REMOVE_ITEM_TEXT } from "../../../shared/types/consts"

interface TodoItemProps {
    id: string,
    text: string,
    onRemove: (id: string) => void
}


export default function TodoItem({ id, text, onRemove }: TodoItemProps) {
    return (
        <View style={style.constainer}>
            <View style={{ flex: 1, padding: 20, alignItems: 'flex-start' }}>
                <Text>{new Date(Date.now()).toString()} :</Text>
                <Text>{text}</Text>
            </View>
            <Button title={REMOVE_ITEM_TEXT} onPress={() => onRemove(id)} />
        </View>
    )

}

const style = StyleSheet.create({
    constainer: {
        borderRadius: 0,
        borderWidth: 1,
        marginVertical: 10,
        padding: 6,
    },
    button: {

    }
})