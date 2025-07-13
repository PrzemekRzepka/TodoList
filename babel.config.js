module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',  // <- dodaj ten plugin jako ostatni w plugins
  ],
};
