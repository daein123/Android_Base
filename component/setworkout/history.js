import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

export default function History() {
    const htyObj = [
        {
            month: 9,
            date: 1,
            day: '화',
            frequency: 1,
            type: [0, 1, 2]
        },
        {
            month: 9,
            date: 2,
            day: '수',
            frequency: 2,
            type: [3, 4]
        },
        {
            month: 9,
            date: 3,
            day: '목',
            frequency: 1,
            type: [5]
        },
        {
            month: 9,
            date: 4,
            day: '금',
            frequency: 3,
            type: [2, 4, 6]
        },
        {
            month: 9,
            date: 5,
            day: '토',
            frequency: 1,
            type: [7]
        },
        {
            month: 9,
            date: 6,
            day: '일',
            frequency: 2,
            type: [3, 5]
        }
    ]
    return (
        <View style={styles.container}>
            <Text style={styles.container_title}>이전 운동 기록을 선택해주세요.</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.htyContainer}>
                    <View style={styles.htyContainer_left}>
                        <Text>left</Text>
                    </View>
                    <View style={styles.htyContainer_right}>
                        <Text>right</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    container_title: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10,
        fontSize: 17,
        fontWeight: '600'
    },
    htyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        height: 100,
        backgroundColor: '#F3F4F6',
        borderRadius: 15,
    },
    htyContainer_left: {
        paddingTop: 20,
        paddingLeft: 10,
    },
    htyContainer_right: {

    },
});