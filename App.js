import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './frontend/reg';
import Main_Page from './frontend/MainPage';
import Login from './frontend/LoginPage';
import MyNavigator from './navigation/Navigator';

export default function App() {
  return (
    // <View style={styles.container}>
      
    // </View>
    <MyNavigator/>
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
