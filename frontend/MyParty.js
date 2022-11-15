import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';


import Searchbar from '../assets/component/searchbar';

const MyParty = ({ navigation }) => {

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
        // <TabView style={[styles.tabView]}
        //   selectedIndex={selectedIndex}
        //   onSelect={index => setSelectedIndex(index)}>
        <View style={styles.tabContainer}>
            <Searchbar></Searchbar>
            <View style={styles.containerFilter}>
                <Text style={[styles.fontTh, { color: '#FDC319', paddingRight: '100px', fontSize: '42px' }]}>ปาร์ตี้ของฉัน</Text>
                <Image source={require('../assets/sort_icon.png')} style={{ width: 30, height: 30 }} />
            </View>
            <View style={styles.containerCardparty}>
                {data.map((item, index) =>
                    <View style={[styles.column6, { padding: 10 }]}>
                        <View style={[styles.row, styles.card]}>
                            <View style={[styles.column3, { padding: 5 }]}>
                                <Image source={require('../assets/foodparty_icon.png')} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }} />
                            </View>
                            <View style={[styles.column9]}>
                                <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '13px', fontWeight: 'bold' }]}>{item.name}</Text>
                            </View>
                        </View>
                    </View>
                )}
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
    }
});

export default MyParty