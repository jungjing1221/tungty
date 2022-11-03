import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './frontend/reg';
import Main_Page from './frontend/MainPage';
import Login from './frontend/LoginPage';

export default function App() {
  return (
    <View style={styles.container}>
      <Register></Register>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4542C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
