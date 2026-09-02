import { StyleSheet, View, Text } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

export default function BottomBar() {
    var activeIndex = 0;
    return (
        <View style={styles.floatBox}>
            <View style={styles.floatBox_item}>
                <FontAwesome name="calendar-check-o" size={24} color={activeIndex === 0 ? "#329EFF" : "black"} />
                <Text style={[styles.floatBox_text, {color: activeIndex === 0 ? "#329EFF" : "black"}]}>투데이</Text>
            </View>
            <View style={styles.floatBox_item}>
                <AntDesign name="message" size={24} color="black" />
                <Text style={styles.floatBox_text}>커뮤니티</Text>
            </View>
            <View style={styles.floatBox_item}>
                <AntDesign name="bar-chart" size={24} color="black" />
                <Text style={styles.floatBox_text}>분석</Text>
            </View>
            <View style={styles.floatBox_item}>
                <Feather name="user" size={24} color="black" />
                <Text style={styles.floatBox_text}>프로필</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    mainContainer: {
        flex: 1,
    },
    floatBox: {
        height: 60,
        borderTopWidth: 0.5,
        borderColor: '#858d96',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    floatBox_item: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatBox_text: {
        marginTop: 5,
    }
});