import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RouteProp, useRoute } from "@react-navigation/native";

import { removeItem, selectTodoLists, toggleDone } from "../slices/todo";
import TodoItem from "../components/TodoItem";
import NewItemInput from "../components/NewItemInput";
import { RootStackParamList } from "../../../shared/types/todoTypes";




export default function TodoItemsScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'TodoItemsScreen'>>()

    const listId = route.params.listId

    const lists = useSelector(selectTodoLists);
    const currentList = lists.find(list => list.id === listId);
    const currentItems = currentList ? currentList.items : [];

    const dispatch = useDispatch()

    function handleRemove(itemId: string) {
        console.log('hanlde remove item');
        dispatch(removeItem({ listId, itemId }));
    }

    function handleDone(itemId: string) {
        dispatch(toggleDone({ listId, itemId }))
    }

    return (
        <View style={styles.container}>

            <FlatList data={currentItems}
                style={styles.list}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <TodoItem
                        listId={listId}
                        id={item.item.id}
                        text={item.item.text}
                        isDone={item.item.isDone}
                        onRemove={() => handleRemove(item.item.id)}
                        onDone={() => handleDone(item.item.id)} />
                } />
            <NewItemInput listId={listId} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1b2840",
    },
    list: {
        paddingHorizontal: 12
    }

})