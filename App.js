// App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}
