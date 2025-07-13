import { useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from "@react-navigation/native";

import { removeItem, selectTodoListItems, toggleDone } from "../slices/todo";

import TodoItem from "../components/TodoItem";
import NewItemInput from "../components/NewItemInput";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TodoListScreen() {
    const todoItemList = useSelector(selectTodoListItems);

    const dispatch = useDispatch()

    function handleRemove(id: string) {
        dispatch(removeItem(id))
    }

    function handleDone(id: string) {
        dispatch(toggleDone(id))
    }

    useFocusEffect(
        useCallback(() => {
            const saveItems = async () => {
                try {
                    if (todoItemList.length > 0) {
                        await AsyncStorage.setItem('TODO', JSON.stringify(todoItemList));
                        console.log('saved item: ', JSON.stringify(todoItemList));
                    }
                } catch (err) {
                    console.log('error during saving items: ', err);
                }
            };
            saveItems();
        }, [todoItemList])
    );

    return (
        <View style={styles.container}>

            <FlatList data={todoItemList}
                style={styles.list}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <TodoItem
                        id={item.item.id}
                        text={item.item.text}
                        createdAt={item.item.createdAt}
                        isDone={item.item.isDone}
                        onRemove={handleRemove}
                        onDone={handleDone} />
                } />
            <NewItemInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    list: {
        paddingHorizontal: 12
    }

})