import React, { useState,useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, getDoc, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';


import Searchbar from '../assets/component/searchbar';
import { async } from '@firebase/util';

const FindParty = ({ navigation }) => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [code, setCode] = useState(0);
  const [data, setData] = useState([])
  useEffect(() => {
    //FETCH PUBLIC PARTY DATA
    const partyList = async () => {
      let puclicParty = []
      let entered
      const partySnapshot =await getDocs(collection(db, "parties"));
      partySnapshot.forEach((doc) => {
        if(!doc.data().selectedPrivate)
        puclicParty.push(doc.data())
      });

      //EX OF USING DATA
      //LIST OF KEY : about,date,head,partyName,type
      console.log(puclicParty[0].partyName)
      setData([...puclicParty]);

    }
    
    partyList()
  },[])

  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular

  });

  if (!fontsLoaded) {
    return null;
  }

  

  // let partyList = []
  //   let entered
  //   const partySnapshot = getDocs(collection(db, "parties"));
  //   // partySnapshot.forEach((doc) => {
  //   //   partyList.push(doc.data())
  //   // });
  //   // console.log(partyList)
  //   console.log(partySnapshot)

  const joinParty = async () => {
    let user
    const username = localStorage.getItem("Username")
    const ref = doc(db, "users", username);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      user = snap.data()}

    let partyList = []
    let entered
    const partySnapshot = await getDocs(collection(db, "parties"));
    console.log(partySnapshot)
    partySnapshot.forEach((doc) => {
      partyList.push(doc.data())
    });
    console.log(partyList)

    //CHECK ENTER CODE WITH PARTY LIST
    partyList.forEach((party) => {
      if (code == party.enterCode) {
        entered = party
        console.log(entered)
        user.party.push(party.partyName)
        console.log(user.party)
        return;
      }
    })

    //ADD PARTY TO USER
    const docRef = await setDoc(doc(db, "users",username), {
      ...user
  });
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
                    <Image source={require('../assets/foodparty_icon.png')} style={{ width: "50px", height: '50px', aspectRatio: "1/1", objectFit: "cover" }} />
                  </View>
                  <View style={[styles.column9]}>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px'}]}>{item.partyName}</Text>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px'}]}>{item.about}</Text>
                    <View style={{alignSelf: 'flex-end'}}>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px'}]}>👤 18</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Layout>
      </Tab>
      <Tab title='PRIVATE PARTY' style={{ backgroundColor: 'white',}}>
          <Layout style={[styles.tabContainer, {paddingTop: '120px'}]}>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    // height: '10'
  },
  column3: {
      width: "25%"
  },
  column9: {
      width: "75%"
  }
});

export default FindParty