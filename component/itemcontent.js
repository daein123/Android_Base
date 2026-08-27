import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ItemBox() {
    return (
        <View style={styles.centerContent}>
            <View style={styles.startButton}>
                <View style={styles.leftSection}>
                    <Text style={{ paddingLeft: 10, paddingBottom: 3, color: '#858d96' }}>짐핏 AI가 추천하는</Text>
                    <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: '600' }}>오늘의 운동으로 시작하기</Text>
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.circleItem}>
                        <MaterialCommunityIcons name="pencil-plus-outline" size={24} color="#329EFF" />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centerContent: {
        alignItems: 'center',
    },
    startButton: {
        width: '90%',
        height: 70,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#329EFF',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    leftSection: {
        justifyContent: 'center'
    },
    rightSection: {
        justifyContent: 'center',
        paddingRight: 10,
    },
    circleItem: {
        borderWidth: 1,
        borderColor: '#329EFF',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});