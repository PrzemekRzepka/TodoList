import { useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';

import { removeItem, selectTodoListItems } from "../slices/todo";

import TodoItem from "../components/TodoItem";
import NewItemInput from "../components/NewItemInput";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TodoListScreen() {
    const todoItemList = useSelector(selectTodoListItems);

    const dispatch = useDispatch()

    function handleRemove(id: string) {
        dispatch(removeItem(id))
    }

    useEffect(() => {
        const saveItems = async () => {
            try {
                await AsyncStorage.setItem('TODO', JSON.stringify(todoItemList));
            } catch (err) {
                console.log('error during saving itemd: ', err)
            }
        }
        saveItems();
    }, [todoItemList])


    return (
        <SafeAreaView>
            <View style={style.container}>
                <NewItemInput />
                <FlatList data={todoItemList}
                    keyExtractor={(item) => item.id}
                    renderItem={(item) =>
                        <TodoItem id={item.item.id} text={item.item.text} onRemove={handleRemove} />
                    } />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        margin: 20,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        height: 400,
        backgroundColor: 'green',
    },

})