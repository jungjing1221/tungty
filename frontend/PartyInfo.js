import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Input, Button, Text, Divider, Icon } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { party } from '../assets/Party';
import images from '../assets/images';
import BottomNavigtor from '../navigation/BottomNavigator';


const PartyInfo = ({ route, navigation }) => {
    const { partyID } = route.params;
    const [joinStatus, setJoinStatus] = useState(0);
    const [isHead, setIsHead] = useState(0);
    const [user, setUser] = useState();
    const [data, setData] = useState({
        head: "",
        partyName:"",
        date:"",
        about:"",
        type:"",
        member:0,
        datetext:""
    });
    const isFocused = useIsFocused()
    useEffect(() => {
        const checkparty = async() => {
            let loginUser;
            const username = localStorage.getItem("Username")
            const ref = doc(db, "users", username);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                loginUser = snap.data()
                setUser(snap.data())
            } else {
                window.alert("เข้าสู่ระบบก่อนใช้งาน")
            }
            setJoinStatus(loginUser.party.includes(partyID))
        }
        const fetchAllparty = () => {
            let partyPromise = party()
            partyPromise.then(async (value) => {
                const username = localStorage.getItem("Username")
                let targetparty = value.filter(party => party.partyName == partyID)
                if(targetparty[0].head == username){
                    setIsHead(1)
                }
                targetparty[0].datetext = targetparty[0].date.toDate().toString().slice(4,15)
                setData(targetparty[0])
            }).catch(err => {
              console.log(err);
            });
        }
        if(isFocused){
            fetchAllparty()
            checkparty()
        }
        
    }, [isFocused])

    const joinParty = async () => {
        user.party.push(partyID)
        data.member.push(user.username )
        //ADD PARTY TO USER
        const docRef = await setDoc(doc(db, "users", user.username), {
          ...user
        });

        const partyRef = await setDoc(doc(db, "parties", partyID), {
            ...data
          });
        setJoinStatus(true)
      }
      const chatRoom = async()=>{
        navigation.navigate("Chat",{partyID:partyID})
      }
      const editPage = async()=>{
        navigation.navigate("EditParty",{partyID:partyID})
      }
    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });
    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style = {[styles.MainContainer, {backgroundColor: 'white'}]}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#FDC319' }}>{data.datetext}</Text>
            <View>
                {(() => {
                if (data.selectedPrivate){
                    return (
                        <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 15, color: '#FDC319' }}>รหัสเข้าร่วม : {data.enterCode}</Text>
                    )
                }

                })()}
                
            </View>
            <Image
                style={{ width: 100, height: 100, marginTop: 45 }}
                source={images.image1}
            />
            <View style={styles.row}>
            <Icon
                style={[styles.icon, {marginTop:10}]}
                fill='#8F9BB3'
                name='person-outline'/><Text style={{fontFamily: 'Kanit_400Regular', color:'grey', fontSize: 18, marginTop: 10}}>{data.member.length}</Text>
                </View>
            <View style={{ marginTop: 10 }}>
                <Divider style={styles.bgWhite} />
                <Text style={styles.fontEngInputHeader}>{data.partyName}</Text>
                <Divider style={styles.bgWhite} />
                <View>
                    <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 10 }}>{data.about}</Text>
                </View>
            </View>
            <View>
                {(() => {
                if (joinStatus){
                    return (
                        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={chatRoom}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Chat</Text>}</Button>
                    )
                }
                else{
                    return (
                        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={joinParty}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Join</Text>}</Button>
                    )
                }
                })()}
                
            </View>
            <View>
                {(() => {
                if (isHead){
                    return (
                        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={editPage}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Edit</Text>}</Button>
                    )
                }

                })()}
                
                
            </View>
            
        </View>
        </ScrollView>
        <View style={ styles.bottomView} >
                <BottomNavigtor navigation={navigation} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Kanit_400Regular',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        width: "100%"
    },
    fontEng: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 18,
        color: '#4542C1',
    },
    fontEngInputHeader: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 30,
        color: '#FDC319',
        margin: 10
    },
    fontEngInput: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        padding: 10,
        marginRight: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
    },
    fontTh: {
        fontFamily: 'OpenSans_500Medium',
        fontSize: 14,
        color: "#ffffff"
    },
    buttonStyle: {
        backgroundColor: '#4542C1',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 240
    },
    textarea: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        textAlignVertical: 'top',  // hack android
        fontSize: 14,
        color: '#333',
        width: 300
    },
    bgWhite: {
        backgroundColor: "grey"
    },
    icon: {
        width: 32,
        height: 32,
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
});

export default PartyInfo