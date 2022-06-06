import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import Navigation from './navigations/Navigation'

LogBox.ignoreAllLogs()

export default function App() {
  return (
     <Navigation/>
  );
}
