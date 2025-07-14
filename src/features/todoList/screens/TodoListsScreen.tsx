import { useEffect, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import TodoList from '../components/TodoList';

import NewListInput from '../components/NewListInput';

import { selectTodoLists, removeList } from '../slices/todo'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../shared/types/todoTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function TodoListsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'TodoItemsScreen'>>();

    const todoLists = useSelector(selectTodoLists);

    const dispatch = useDispatch();


    function handleRemove(listId: string) {
        dispatch(removeList(listId))

    }

    function handlePress(list: typeof todoLists[0]) {
        navigation.navigate('TodoItemsScreen', {
            listTitle: list.title,
            createdAt: list.createdAt,
            listId: list.id,
            items: list.items
        });
    }

    useEffect(
        useCallback(() => {
            const saveItems = async () => {
                try {
                    if (todoLists.length > 0) {
                        await AsyncStorage.setItem('TODO', JSON.stringify(todoLists));
                        console.log('saved lists: ', JSON.stringify(todoLists));
                    }
                } catch (err) {
                    console.log('error during saving items: ', err);
                }
            };
            saveItems();
        }, [todoLists])
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={todoLists}
                keyExtractor={list => list.id}
                renderItem={list => <TodoList
                    id={list.item.id}
                    title={list.item.title}
                    createdAt={list.item.createdAt}
                    items={list.item.items}
                    onPress={() => handlePress(list.item)}
                    onRemove={handleRemove} />} />
            <NewListInput />
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