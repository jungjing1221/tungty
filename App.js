import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './frontend/reg';


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
