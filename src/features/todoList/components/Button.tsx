import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";


interface buttonProps {
    title: string,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

export default function Button({ title, onPress, style }: buttonProps) {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#367ff5',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
    },
    title: {
        color: 'white'
    }
})