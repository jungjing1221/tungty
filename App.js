import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Register from './frontend/reg';
import Main_Page from './frontend/MainPage';
import Login from './frontend/LoginPage';
import CreateNewParty from './frontend/CreateParty';
import MyNavigator from './navigation/Navigator';
import './assets/base.css'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MyNavigator />
      </ApplicationProvider>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

  },
});