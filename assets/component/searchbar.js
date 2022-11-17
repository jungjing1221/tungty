import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';

export default function Searchbar({ value, updateSearch, style }) {

    return (
        <View style={[styles.container]}>
            <View style={[styles.searchContainer]}>

                <TextInput
                    placeholder="Search"
                    style={styles.textInput}
                />
                <View style={styles.vwSearch}>
                    <Image
                        style={styles.icSearch}
                        source={require('../component/search_icon.png')} />
                </View>
            </View>
        </View >
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
});