import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';


import App from './App';
import { store } from './src/store';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';

enableScreens();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);