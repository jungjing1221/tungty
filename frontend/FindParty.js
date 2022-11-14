import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image} from 'react-native';
import { Layout, Tab, TabView, Text , Input, Button, Card} from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';

import Searchbar from '../assets/component/searchbar';

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
          <Searchbar></Searchbar>
          <View style={styles.containerFilter}>
              <Text category='h1' style={[styles.fontTh, { color: '#FDC319', paddingRight: '150px'}]}>หาปาร์ตี้</Text>
              <Image source={require('../assets/filter_icon.png')} style={{ width: 30, height: 30 }}/>
          </View>
          <View style={styles.containerCardparty}>
            <View style={{paddingBottom: '10px'}}>
              <Card style={[styles.card, {backgroundColor: "#FDE619",}, ]}>
                <Image source={require('../assets/foodparty_icon.png')} style={{ width: 50, height: 50 }}/>
              </Card>
            </View>
            <View style={{paddingBottom: '100px'}}>
              <Card style={[styles.card, {backgroundColor: "#FDE619",}, ]}>
                <Image source={require('../assets/foodparty_icon.png')} style={{ width: 50, height: 50 }}/>
              </Card>
            </View>
          </View>
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
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: '20px'
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
  // containsFilter: {
  //   display: 'flex',
  //   flexDirection: 'column'
  // },
  containerFilter: {
      alignItems: 'center',
      // height: '100%', width: '100%' ,
      backgroundColor: 'white',
      flexDirection: 'row',
  },
  vwSearch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    backgroundColor: '#4542C1',
    borderRadius: '30px',
  },
  searchContainer:
    {
        height: 40,
        width: '100%',
        backgroundColor: '#4542C1',
        // borderRadius: '30px', 
  },
  card: {
    alignItems: 'center',
    height: '100px',
    borderRadius: '15px',
    borderColor: 'transparent',
    flexDirection: 'row',
  },
  containerCardparty: {
    width: '90%',
  }
});

export default FindParty