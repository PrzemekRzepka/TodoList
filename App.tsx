import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TodoItemsScreen from './src/features/todoList/screens/TodoItemsScreen';
import TodoListsScreen from './src/features/todoList/screens/TodoListsScreen';
import ListHeader from './src/features/todoList/components/ListHeader';

import { addLists } from './src/features/todoList/slices/todo';
import { RootStackParamList } from './src/shared/types/todoTypes';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const dispatch = useDispatch()


  async function loadItems() {
    const jsonItems = await AsyncStorage.getItem("TODO");
    console.log(jsonItems);
    if (jsonItems) {
      dispatch(addLists(JSON.parse(jsonItems)));
      console.log('loaded items: ');

    } else {
      console.log('no items to load');
    }
  }

  useEffect(() => {
    loadItems();
  }, [])

  function ToDoStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='TodoLists'
          component={TodoListsScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="TodoItemsScreen"
          component={TodoItemsScreen}
          options={({ route }) => ({
            header: () => (
              <ListHeader title={route.params.listTitle} createdAt={route.params.createdAt} />
            )
          })}
        />
      </Stack.Navigator>
    )
  }

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
          name={"To Do Lists"}
          component={ToDoStack}
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
