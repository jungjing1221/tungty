import React from 'react';
import { StyleSheet} from 'react-native';
import { Layout, Tab, TabView, Text , Input, Button} from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';

import Searchbar from '../assets/searchbar';

const FindParty = ({navigation}) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium
});

if (!fontsLoaded) {
    return null;
}

  return (
    <TabView style={styles.tabView}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='PUBLIC PARTY' style={{backgroundColor: 'white'}}>
        <Layout style={styles.tabContainer}>
          <Searchbar style={{ marginTop: '8%' }}>
          </Searchbar>
        </Layout>
      </Tab>
      <Tab title='PRIVATE PARTY' style={{backgroundColor: 'white'}}>
        <Layout style={styles.tabContainer}>
          <Text category='h1' style={[styles.fontTh, { color: '#FDC319', }]}>ปาร์ตี้ส่วนตัว</Text>
          <Text category='h6' style={[styles.fontTh, { color: '#4542C1', }]}>โค้ดสำหรับเข้าร่วมปาร์ตี้ส่วนตัว :</Text>
          <Input style={[styles.fontEng, styles.fontEngInput, {backgroundColor : '#D9D9D9'}]} onChangeText={text => setUsername(text)} />
          <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]}>join</Button>
          
        </Layout>
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  tabView: {
    backgroundColor: 'white',
    flex: 1,
  },
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabBar: {
    backgroundColor: 'white',
  }, 
  fontEng: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
  },
  fontEngInputHeader: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  fontEngInput: {
    fontFamily: 'Kanit_400Regular',
    borderRadius: '30px',
    width: 280,
    backgroundColor: 'transparent',
  },
  fontTh: {
    fontFamily: 'Kanit_400Regular',
  },
  buttonStyle: {
    backgroundColor: '#4542C1',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: 240,
    color: 'red'
  },
});

export default FindParty