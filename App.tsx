import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TodoListScreen from './src/feature/todoList/screens/TodoListScreen';

import { store } from './src/store'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
