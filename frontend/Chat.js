import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';

import Searchbar from '../assets/component/searchbar';

const Chat = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [data, setData] = useState([
        { id: 1, name: "User 1", description: "Hello 1", state: 'other' },
        { id: 2, name: "User 2", description: "Hello 2", state: 'other' },
        { id: 3, name: "User 3", description: "Hello 3", state: 'other' },
        { id: 4, name: "User 4", description: "Hello 4", state: 'user' },
        { id: 5, name: "User 5", description: "Hello 5", state: 'other' },
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
            <View style={[styles.containerCardparty]}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={[styles.containerCardparty]}>
                            <View style={[styles.row, { padding: '10px' }]}>
                                <View>
                                    <ImageBackground source={require('../assets/circlebg.png')} style={{ width: '40px', height: '40px', justifyContent: 'center', alignItems: 'center', }}>
                                        <Image source={require('../assets/foodparty_icon.png')} style={{ width: 25, height: 25, }} />
                                    </ImageBackground>
                                </View>

                                <View style={[{ alignContent: 'center', justifyContent: 'center', paddingLeft: '10px' }]}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                </View>
                            </View>

                            {item.state === 'user' ?
                                <View style={[styles.card, { width: 'auto', backgroundColor: '#4542C1' }]}>
                                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '20px', fontWeight: 'bold' }]}>{item.description}</Text>
                                </View> : <View style={[styles.card, { width: 'auto', }]}>
                                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '20px', fontWeight: 'bold' }]}>{item.description}</Text>
                                </View>}

                        </View>}
                    keyExtractor={(item) => item.id}
                />

                <View style={[styles.searchContainer, {width: '100%'}]}>

                    <TextInput
                        // placeholder="Search"
                        style={styles.textInput}
                    />
                    <View style={{justifyContent: 'center', }}>
                        <Text>SENT</Text>
                    </View>


                </View>

                {/* Search Results Container */}

                <View></View>
            </View >
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
    card: {
        padding: 10,
        backgroundColor: '#D9D9D9',
        borderRadius: "10px",
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
    }, textInput: {
        // backgroundColor: 'green',
        flex: 1,
        color: 'white',
        width: '100%',
        height: '100%',
        // backgroundColor: '#yellow',
        borderColor: 'transparent',
        borderRadius: '30px',
    },
    container: {
        alignItems: 'center',
        // height: '80%', 
        width: '90%',
        backgroundColor: 'white',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
        color: 'white',
        width: '100%',
        height: '100%',
        backgroundColor: '#FDC319',
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
        height: 18, width: 18,
    },
    searchContainer:
    {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        // borderRadius: '30px', 
    },
    // container: {
    //     alignItems: 'center',
    //     // height: '80%', 
    //     width: '80%' ,
    //     backgroundColor: 'white',
    // },
});

export default Chat