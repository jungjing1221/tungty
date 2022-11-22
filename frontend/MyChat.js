import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image, ImageBackground} from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import BottomNavigtor from '../navigation/BottomNavigator';


import Searchbar from '../assets/component/searchbar';

const MyChat = ({ navigation }) => {

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
        <View style = {[styles.MainContainer, {backgroundColor: 'white'}]}>
            <ScrollView style={styles.scrollView}>
        <View style={styles.tabContainer }>
            <Searchbar></Searchbar>
            <View style={[styles.containerCardparty]}>
                {data.map((item, index) =>
                    <View style={[{ paddingBottom: '10px' , paddingTop: '10px'}]}>
                        <View style={[styles.row, styles.card, ]}>
                            <View style={[styles.column3, { padding: 5 }]}>
                                <ImageBackground source={require('../assets/circlebg.png')} style={{ width: '80px', height: '80px', justifyContent: 'center', alignItems: 'center',}}>
                                    <Image source={require('../assets/foodparty_icon.png')} style={{ width: 50, height: 50, }} />
                                </ImageBackground>
                            </View>
                            <View style={[styles.column9, {paddingLeft: '10px'}]}>
                                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '20px', fontWeight: 'bold' }]}>{item.name}</Text>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </View>
            </ScrollView>
            <View style={ styles.bottomView} >
                <BottomNavigtor/>
            </View>
        </View>



        // </TabView>
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
        backgroundColor: '#FFF9E5',
        borderRadius: "30px",
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

export default MyChat