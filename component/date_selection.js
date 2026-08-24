import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function DateSelection() {
    const [weekAnchor, setWeekAnchor] = useState(new Date("2026-08-24"));
    const weekDates = getWeekDates(weekAnchor);
    const days = ['일', '월', '화', '수', '목', '금', '토'];


    // 일주일 일자 계산
    function getWeekDates(dateObj) {
        const toDay = dateObj.getDay();
        const startDate = dateObj.getDate() - toDay;

        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const date = startDate;
        const result = [];
        for (var i = 0; i < 7; i++) {
            const retObj = new Date(year, month, date + i);
            result.push(retObj);
        }
        return result;
    }
    return (
        <View>

            {/* 일월화수~토 */}
            <View style={styles.itemRow}>
                {weekDates.map((dateObj, index) => (
                    <View key={index} style={styles.rowItem}>
                        <View>
                            <Text style={styles.dateText}>{days[dateObj.getDay()]}</Text>
                        </View>
                    </View>
                ))}
            </View>
            {/* 날짜 */}
            <View style={styles.itemRow}>
                {weekDates.map((dateObj, index) => (
                    <View key={index} style={styles.rowItem}>
                        <View style={styles.circledItem}>
                            <Text style={styles.dateText}>{dateObj.getDate()}</Text>
                        </View>
                    </View>
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    itemRow: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    rowItem: {
        flex: 1,                   // 요일 행과 동일하게 7칸 균등 분할
        alignItems: 'center',      // 그 칸 안에서 원을 가운데로
    },
    circledItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4a90e2',
        backgroundColor: '#4a90e2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateText: {
        textAlign: 'center',
    },
});