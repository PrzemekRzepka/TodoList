import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TodoListScreen from './src/features/todoList/screens/TodoListScreen';

import { addItems } from './src/features/todoList/slices/todo';

import { store } from './src/store'

function App() {
  const dispatch = useDispatch()


  async function loadItems() {
    const jsonItems = await AsyncStorage.getItem("TODO");
    if (jsonItems) {
      dispatch(addItems(JSON.parse(jsonItems)));
    }
  }

  useEffect(() => {
    loadItems();
  })

  return (

    <Provider store={store}>
      <TodoListScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
