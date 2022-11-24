import React, { useState, useEffect } from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image, TouchableHighlight
} from 'react-native';
import { Layout } from '@ui-kitten/components';

const BottomNavigtor = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Inter_900Black, OpenSans_500Medium, Kanit_400Regular
    
      });

  if (!fontsLoaded) {
    return null;
  }

  const handleNavigate = (pathName) => {
      navigation.navigate(pathName)
}

return (
        <View style={{ width: '100%', position: 'absolute', bottom: '0' }}>
            <View style={{
                width:'100%', 
                flex: 1,
                flexDirection: 'row', backgroundColor:'#FDC319'
            }}>
                <TouchableOpacity style={{width:'25%', height: '65px',alignContent: 'center', justifyContent: 'center'}} onPress={() => handleNavigate("FindParty")}>
                    <Image source={require('../assets/find_party.png')} style={{ width: 35, height: 35, alignSelf:'center'}} />
                    <Text style={[{alignSelf:'center'}, styles.fontTh]}>หาปาร์ตี้</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', height: '65px',alignContent: 'center', justifyContent: 'center'}} onPress={() => handleNavigate("MyParty")}>
                    <Image source={require('../assets/myparty.png')} style={{ width: 35, height: 35, alignSelf:'center'}} />
                    <Text style={[{alignSelf:'center'}, styles.fontTh]}>ปาร์ตี้ของฉัน</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', height: '65px',alignContent: 'center', justifyContent: 'center'}} onPress={() => handleNavigate("MyChat")}>
                    <Image source={require('../assets/chat.png')} style={{ width: 35, height: 35, alignSelf:'center'}} />
                    <Text style={[{alignSelf:'center'}, styles.fontTh]}>แชท</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'25%', height: '65px',alignContent: 'center', justifyContent: 'center'}} onPress={() => handleNavigate("ProfileInfo")} >
                        <Image source={require('../assets/profile.png')} style={{ width: 35, height: 35, alignSelf:'center'}}/>
                        <Text style={[{alignSelf:'center'}, styles.fontTh ]} >โปรไฟล์</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}
const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'black',
    },
    // vwClear: {
    //     flex: 0.2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
        color: 'white',
        width: '100%',
        height: '100%',
        backgroundColor: '#4542C1',
        borderColor: 'transparent',
        borderRadius: '30px',
    },
    vwSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: '#4542C1',
        borderRadius: '30px',
    },
    icSearch: {
        height: 18, width: 18, backgroundColor: '#4542C1'
    },
    searchContainer:
    {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#4542C1',
        borderRadius: '30px',
    },
    container: {
        alignItems: 'center',
        // height: '80%', 
        width: '80%',
        backgroundColor: 'white',
    },
    fontTh: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: "#ffffff"
      }
});

export default BottomNavigtor