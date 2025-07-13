import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TodoListScreen from './src/features/todoList/screens/TodoListScreen';

import { addItems } from './src/features/todoList/slices/todo';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2e466e',
          },
          headerTintColor: '#fff',
          drawerActiveTintColor: 'white',
          drawerStyle: {
            backgroundColor: '#2e466e',

          },
        }}>
        <Drawer.Screen
          name={"Todo List"}
          component={TodoListScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
