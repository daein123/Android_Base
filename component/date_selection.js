import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function DateSelection() {
    const [weekAnchor, setWeekAnchor] = useState(new Date("2026-08-24"));
    const weekDates = getWeekDates(weekAnchor);
    const days = ['일', '월', '화', '수', '목', '금', '토'];


    // 일주일 일자 계산
    function getWeekDates(anchorDate) {
        const diffDate = new Date(anchorDate);
        if (anchorDate.getDay() !== 3) {
            diffDate.setDate(anchorDate.getDate() - 3);
        }
        const currentDate = diffDate.getDate();
        const maxDate = new Date(diffDate.getFullYear(), diffDate.getMonth() + 1, 0).getDate();
        const maxBeforeDate = new Date(diffDate.getFullYear(), diffDate.getMonth(), 0).getDate();

        return [
            isLower(currentDate - 3) ? maxBeforeDate + (currentDate - 3) : currentDate - 3,
            isLower(currentDate - 2) ? maxBeforeDate + (currentDate - 2) : currentDate - 2,
            isLower(currentDate - 1) ? maxBeforeDate + (currentDate - 1) : currentDate - 1,
            currentDate,
            isOver(currentDate + 1) ? (currentDate + 1) - maxDate : currentDate + 1,
            isOver(currentDate + 2) ? (currentDate + 2) - maxDate : currentDate + 2,
            isOver(currentDate + 3) ? (currentDate + 3) - maxDate : currentDate + 3
        ]

        function isLower(value) {
            if (value < 0) return true;
            return false;
        }
        function isOver(value) {
            if (value > maxDate) return true;
            return false;
        }
    }
    return (
        <View>

            {/* 일월화수~토 */}
            <View style={styles.itemRow}>
                {days.map((day, index) => (
                    <Text key={index} style={styles.rowItem}>{day}</Text>
                ))}
            </View>
            {/* 날짜 */}
            <View style={styles.itemRow}>
                {weekDates.map((date, index) => (
                    <Text key={index} style={styles.rowItem}>{date}</Text>
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
        borderWidth: 1,
        borderColor: '#4a90e2',
    },
    rowItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#4a90e2',
        textAlign: 'center'
    }
});