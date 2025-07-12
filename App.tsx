import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import TodoListScreen from './src/features/todoList/screens/TodoListScreen';

import { addItems } from './src/features/todoList/slices/todo';

function App() {
  const dispatch = useDispatch()


  async function loadItems() {
    const jsonItems = await AsyncStorage.getItem("TODO");
    console.log(jsonItems);
    if (jsonItems) {
      dispatch(addItems(JSON.parse(jsonItems)));
      console.log('loaded items: ');

    } else {
      console.log('no items to load');
    }
  }

  useEffect(() => {
    loadItems();
  }, [])

  return (
    <NavigationContainer>
      <TodoListScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
