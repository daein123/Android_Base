import { StyleSheet, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import AddSelf from './addself';

// import AddSelf from "./addself";

export default function SetWorkout() {
    const today = new Date();
    const dateText = today.getMonth() + 1 + "월 " + today.getDate() + "일";
    const [activeIndex, setActiveIndex] = useState(0);
    const getTabColor = (index) => {return activeIndex === index ? "black" : "#858d96"};
    const getTabBorder = (index) => {return activeIndex === index ? 1 : 0};
    return (
        <View>
            <View style={styles.topBar}>
                <Ionicons name="caret-back-outline" size={30} color="black" />
                <Text style={{ fontWeight: '800', fontSize: 16 }}>{dateText}</Text>
                <AntDesign name="youtube" size={30} color="black" />
            </View>
            <View style={styles.tabBar}>
                <Text style={[styles.tabBar_text, {color: getTabColor(0), borderBottomWidth: getTabBorder(0) }]}>직접 추가</Text>
                <Text style={[styles.tabBar_text, {color: getTabColor(1) }]}>내 루틴</Text>
                <Text style={[styles.tabBar_text, {color: getTabColor(2) }]}>불러오기</Text>
            </View>
            <AddSelf />
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        alignItems: 'center'
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40,
        borderBottomWidth: 0.5,
        borderColor: '#858d96',
    },
    tabBar_text: {
        width: '30%',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        height: '100%',
        lineHeight: 40
    }
});