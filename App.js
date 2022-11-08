import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Register from './frontend/reg';
import Main_Page from './frontend/MainPage';
import Login from './frontend/LoginPage';
<<<<<<< HEAD
import MyNavigator from './navigation/Navigator';

export default function App() {
  return (
    // <View style={styles.container}>
      
    // </View>
    <MyNavigator/>
=======
import CreateNewParty from './frontend/CreateParty';
import './assets/base.css'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <View style={styles.container}>
        {/* <Register></Register> */}
        <Register></Register>
        {/* <Text>testsetset</Text> */}
      </View>
    </ApplicationProvider>
>>>>>>> c91ed27f9a6b206f86c906dbb74eabb5434f5b81
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
