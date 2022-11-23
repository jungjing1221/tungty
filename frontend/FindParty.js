import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card, IndexPath, Select, SelectItem, Icon } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, getDoc, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import Searchbar from '../assets/component/searchbar';
import { party } from '../assets/Party';
import BottomNavigtor from '../navigation/BottomNavigator';

const FindParty = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [code, setCode] = useState(0);
  const [text, setText] = useState('Hi Frame');
  const [data, setData] = useState([])
  const [selectedFilter, setSelectedFilter] = useState(new IndexPath(0));
  const [parties, setParties] = useState({
    0: [],
    1: []
  })

  if(isNaN(selectedIndex)) {
    setSelectedIndex(0)
  }

  useEffect(() => {
    //SET ALL PARTY FROM RETURN PROMISE VALUE
    const fetchAllparty = () => {
      let partyPromise = party()
      partyPromise.then(async (value) => {
        let publicParties = value.filter(party => party.selectedPrivate == 0)
        let privateParties = value.filter(party => party.selectedPrivate == 1)
        setParties({ 0: [...publicParties], 1: [...privateParties] });
        setData([...publicParties])
      }).catch(err => {
        console.log(err);
      });
    }
    fetchAllparty()
    return () => {
      setSelectedIndex(0)
    }
  }, [])
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular

  });

  if (!fontsLoaded) {
    return null;
  }
  const filter = [
        'ทั้งหมด',
        'อาหาร',
        'ท่องเที่ยว',
        'พักผ่อน',
        'เรียน/ทำงาน',
        'อื่น ๆ'
    ];
  const displayValue = filter[selectedFilter.row];
  const findParty = async () => {
    console.log(text)
    let target = parties[0].filter(party => party.partyName.includes(text))
    console.log(target)
    setData([...target]);

  }
  const joinParty = async () => {
    let user
    const username = localStorage.getItem("Username")
    const ref = doc(db, "users", username);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      user = snap.data()
    } else {
      window.alert("มึงไม่มี USER")
    }

    let entered = parties[1].find(party => party.enterCode == code)
    console.log(parties[1],entered)
    if(!entered) return window.alert("โค้ดเข้าร่วมปาร์ตี้ไม่ถูกต้อง")
    else {
      user.party.push(entered.partyName)
      entered.member.push(user.username)
      
    //ADD PARTY TO USER
    const docRef = await setDoc(doc(db, "users", username), {
      ...user
    });

    const partyRef = await setDoc(doc(db, "parties", partyID), {
      ...data
    });
      navigation.navigate("PartyInfo",{partyID:entered.partyName});
    }

  }


  return (

    <View style = {[styles.MainContainer, {backgroundColor: 'white'}]}>
    <ScrollView style={styles.scrollView}>
    <TabView style={[styles.tabView]}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='PUBLIC PARTY' style={{ backgroundColor: 'white',}}>
        <Layout style={[styles.tabContainer]}>
          <Searchbar setTextProp={setText} findPartyProp={findParty}></Searchbar>
          <View style={styles.containerFilter}>
                <Text category='h1' style={[styles.fontTh, { color: '#FDC319', paddingRight: '50px' }]}>หาปาร์ตี้</Text>
                <Icon
                style={[styles.icon, {marginTop:10}]}
                name='funnel-outline'/>
                <Layout level='1'>
                  <Select
                    selectedIndex={selectedFilter}
                    value={displayValue}
                    onSelect={index => setSelectedFilter(index)}>
                    <SelectItem title='ทั้งหมด' />
                    <SelectItem title='อาหาร' />
                    <SelectItem title='ท่องเที่ยว' />
                    <SelectItem title='พักผ่อน' />
                    <SelectItem title='เรียน/ทำงาน' />
                    <SelectItem title='อื่น ๆ' />
                  </Select>
                </Layout>
              </View>
          <View style={styles.containerCardparty}>
            {data.map((item, index) =>
              <TouchableOpacity style={[{ paddingBottom: '10px' }]} key={index} onPress={() => { navigation.navigate("PartyInfo",{partyID:data[index].partyName});}}>
                <View style={[styles.row, styles.card]}>
                  <View style={[styles.column3, { padding: 5 }]}>
                    <Image source={require('../assets/foodparty_icon.png')} style={{ width: "50px", height: '50px', aspectRatio: "1/1", objectFit: "cover" }} />
                  </View>
                  <View style={[styles.column9]}>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '18px' }]}>{item.partyName}</Text>
                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px',opacity:0.5 }]}>{item.about}</Text>
                    <View style={{ alignSelf: 'flex-end' }}>
                      <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px' }]}>👤 {item.member.length}</Text>
                    </View>
                  </View>
                </View>
                
              </TouchableOpacity>
            )}
          </View>
        </Layout>
      </Tab>
      <Tab title='PRIVATE PARTY' style={{ backgroundColor: 'white' }}>
        <Layout style={styles.tabContainer}>
          <Text category='h1' style={[styles.fontTh, { color: '#FDC319', }]}>ปาร์ตี้ส่วนตัว</Text>
          <Text category='h6' style={[styles.fontTh, { color: '#4542C1', }]}>โค้ดสำหรับเข้าร่วมปาร์ตี้ส่วนตัว :</Text>
          <Input style={[styles.fontEng, styles.fontEngInput, { backgroundColor: '#D9D9D9' }]} onChangeText={text => setCode(text)} />
          <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={joinParty}>Join</Button>
        </Layout>
      </Tab>
    </TabView>
    </ScrollView>
 
    
 <View style={ styles.bottomView} >
  <Button style={{width:50, height:50, borderRadius:'100%', marginBottom:150, marginLeft:300}}>
          <Text style={[styles.buttonTextStyle,{fontSize: 100}]}>+</Text>
        </Button>
    <BottomNavigtor navigation={navigation} />

 </View>

</View>
    
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
  icon: {
    width: 32,
    height: 32,
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
  },
  MainContainer:
    {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    bottomView:{
 
      width: '100%', 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 0
    },
 
    textStyle:{
 
      color: '#fff',
      fontSize:22
    },
    buttonTextStyle : {
      color:'white',
      fontSize: 100,
      marginBottom: 6
    }
});

export default FindParty
