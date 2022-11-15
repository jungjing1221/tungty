import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import Searchbar from '../assets/component/searchbar';

const Notification = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [data, setData] = useState([
        { id: 1, name: "เราพวกผองชาวสจล.ไปหาข้าวกิน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง", datetimeNoti: "4 SEPTEMBER 2022 08:30" },
        { id: 2, name: "ไปเรียนคณะกันชาวไอที", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง", datetimeNoti: "4 SEPTEMBER 2022 08:30" },
        { id: 3, name: "ไปเตะบอลกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง", datetimeNoti: "4 SEPTEMBER 2022 08:30" },
        { id: 4, name: "ไปตลาดหอในกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง", datetimeNoti: "4 SEPTEMBER 2022 08:30" },
        { id: 5, name: "เล่นเกมกันเพื่อนๆ", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง", datetimeNoti: "4 SEPTEMBER 2022 08:30" },
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
        <View style={[styles.containerCardparty]}>
            <View style={{alignItems: 'flex-end', paddingRight: '10px', height: '25px', shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3,shadowRadius: 3,}}>
                <Text style={[styles.fontTh, { color: 'black', fontSize: '15px', fontWeight: 'bold' }]}>Read all({data.length})</Text>
            </View>
            {data.map((item, index) =>
                <View style={[{ paddingBottom: '2px', paddingTop: '5px'}]}>
                    <View style={[styles.row, styles.card,]}>
                        <View style={[styles.column3, { padding: 5 }]}>
                            <Image source={require('../assets/foodparty_icon.png')} style={{ width: 30, height: 30, }} />
                        </View>
                        <View style={[styles.column9,]}>
                            <Text style={[styles.fontTh, { color: 'black', fontSize: '20px', fontWeight: 'bold' }]}>{item.name}</Text>
                            <Text style={[styles.fontTh, { color: 'black', fontSize: '15px', fontWeight: 'bold' }]}>ปลุกแจ้งเตือนแบบกลุ่มแล้ว</Text>
                            <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '14px', fontWeight: 'bold', }]}>{item.datetimeNoti}</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>



        // </TabView>
    );
};

const styles = StyleSheet.create({
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
    card: {
        padding: 10,
        backgroundColor: '#FFCDCD',
        borderRadius: "10px",
        borderColor: "transparent",
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    containerCardparty: {
        width: '100%',
    },
    row: {
        flexWrap: "wrap",
        display: "flex",
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '100px'
    },
    column3: {
        width: "25%"
    },
    column9: {
        width: "75%"
    }
});

export default Notification