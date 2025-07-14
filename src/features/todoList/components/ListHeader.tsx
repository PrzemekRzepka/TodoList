import { View, Text } from 'react-native'

interface ListHeaderProps {
    title: string,
    createdAt: string,
}

export default function ListHeader({ title, createdAt }: ListHeaderProps) {
    return (
        <View style={{ height: 70, backgroundColor: '#2e466e', justifyContent: 'center', paddingHorizontal: 16 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{createdAt}</Text>
            <Text style={{ color: 'white', fontSize: 24 }}>{title}</Text>
        </View>
    )
}