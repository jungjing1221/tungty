import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, getDoc, doc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { party } from '../assets/Party';
import Searchbar from '../assets/component/searchbar';
import BottomNavigtor from '../navigation/BottomNavigator';

const MyParty = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [data, setData] = useState([])
    const [text, setText] = useState('');
    useEffect(() => {
        //FETCH PUBLIC PARTY DATA
        const fetchAllparty = () => {
            let partyPromise = party()
            partyPromise.then(async (value) => {
                let user
                const username = localStorage.getItem("Username")
                const ref = doc(db, "users", username);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    user = snap.data()
                } else {
                    window.alert("มึงไม่มี USER")
                }

                let myParty = value.filter(party => user.party.includes(party.partyName))
                setData(myParty);

            }).catch(err => {
                console.log(err);
            });
        }
        fetchAllparty()
    }, [])

    const findParty = async () => {
        console.log(text)
        let target = data.filter(party => party.partyName.includes(text))
        console.log(target)
        setData([...target]);
        
      }

    let [fontsLoaded] = useFonts({
        Inter_900Black, OpenSans_500Medium, Kanit_400Regular

    });

    if (!fontsLoaded) {
        return null;
    }

    return (

        // <TabView style={[styles.tabView]}
        //   selectedIndex={selectedIndex}
        //   onSelect={index => setSelectedIndex(index)}>
        <View style={[styles.MainContainer, { backgroundColor: 'white' }]}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.tabContainer}>
                <Searchbar setTextProp={setText} findPartyProp={findParty}></Searchbar>
                <View style={styles.containerFilter}>
                    <Text style={[styles.fontTh, { color: '#FDC319', paddingRight: '100px', fontSize: '42px' }]}>ปาร์ตี้ของฉัน</Text>
                    <Image source={require('../assets/sort_icon.png')} style={{ width: 30, height: 30 }} />
                </View>
                <View style={styles.containerCardparty}>
                    {data.map((item, index) =>
                        <TouchableOpacity key={index} style={[styles.column6, { padding: 10 }]} onPress={() => { navigation.navigate("PartyInfo", { partyID: data[index].partyName }); }}>
                            <View style={[styles.row, styles.card]}>
                                <View style={[styles.column3, { padding: 5 }]}>
                                    <Image source={require('../assets/foodparty_icon.png')} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                                </View>
                                <View style={[styles.container, styles.column9]}>
                                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px', fontWeight: 'bold' }]}>{item.partyName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                </View>
            </ScrollView>
            <View style={styles.bottomView} >
            <Button style={[styles.buttonStyle, { width: 50, height: 50, borderRadius: '100%', alignSelf: 'flex-end', marginBottom: '140px', marginRight: '10px' }]}>
          <Text style={[styles.buttonTextStyle, { fontSize: 100 }]}>+</Text>
        </Button>
                <BottomNavigtor navigation={navigation} />
            </View>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Kanit_400Regular',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    tabView: {
        backgroundColor: 'white',
        flex: 1,

    },
    tabContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
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
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: "flex"
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
    column: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '100%',
        flex: '1',
    },
    column6: {
        width: "50%",
    },
    column3: {
        width: "25%"
    },
    column9: {
        width: "75%"
    },
    row2: {
        // flexDirection: "row",
        // flexWrap: "wrap",
        // display: "flex",
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    MainContainer:
    {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    bottomView: {

        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },

    textStyle: {

        color: '#fff',
        fontSize: 22
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

export default MyParty