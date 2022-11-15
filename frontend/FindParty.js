import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';


import Searchbar from '../assets/component/searchbar';

const FindParty = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [data, setData] = useState([
    { id: 1, name: "เราพวกผองชาวสจล.ไปหาข้าวกิน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
    { id: 2, name: "ไปเรียนคณะกันชาวไอที", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
    { id: 3, name: "ไปเตะบอลกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
    { id: 4, name: "ไปตลาดหอในกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
    { id: 5, name: "เล่นเกมกันเพื่อนๆ", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
])
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular

  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TabView style={[styles.tabView]}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='PUBLIC PARTY' style={{ backgroundColor: 'white' }}>
        <Layout style={styles.tabContainer}>
          <Searchbar></Searchbar>
          <View style={styles.containerFilter}>
            <Text category='h1' style={[styles.fontTh, { color: '#FDC319', paddingRight: '150px' }]}>หาปาร์ตี้</Text>
            <Image source={require('../assets/filter_icon.png')} style={{ width: 30, height: 30 }} />
          </View>
          <View style={styles.containerCardparty}>
            {data.map((item, index) =>
              <View style={[{ paddingBottom: '10px' }]}>
                <View style={[styles.row, styles.card]}>
                  <View style={[styles.column3, { padding: 5 }]}>
                    <Image source={require('../assets/foodparty_icon.png')} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                  </View>
                  <View style={[styles.column9]}>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px'}]}>{item.name}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Layout>
      </Tab>
      <Tab title='PRIVATE PARTY' style={{ backgroundColor: 'white' }}>
        <Layout style={styles.tabContainer}>
          <Text category='h1' style={[styles.fontTh, { color: '#FDC319', }]}>ปาร์ตี้ส่วนตัว</Text>
          <Text category='h6' style={[styles.fontTh, { color: '#4542C1', }]}>โค้ดสำหรับเข้าร่วมปาร์ตี้ส่วนตัว :</Text>
          <Input style={[styles.fontEng, styles.fontEngInput, { backgroundColor: '#D9D9D9' }]} onChangeText={text => setUsername(text)} />
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
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: "15px",
    borderColor: "transparent",
  },
  containerCardparty: {
    width: '90%',
  },
  row: {
    flexWrap: "wrap",
    display: "flex",
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '10'
  },
  column3: {
      width: "25%"
  },
  column9: {
      width: "75%"
  }
});

export default FindParty