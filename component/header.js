import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function header() {
    return (
        <View style={styles.headerRow}>
            <View style={[styles.streakBox, { flex: 1, alignItems: 'flex-start' }]}>
                <AntDesign name="fire" color="red" size={25} />
                <Text style={styles.streakText}>25</Text>
            </View>

            <View style={[styles.upgradeBadge, { flex: 1, alignItems: 'center' }]}>
                <Text style={styles.upgradeText}>UPGRADE</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <AntDesign name="calendar" color="black" size={22} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',        // 이게 핵심 — 세 요소 세로 중앙 정렬
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    streakBox: {
        flexDirection: 'row',
        alignItems: 'center',        // 아이콘과 "25" 세로 중앙 정렬
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    upgradeBadge: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#329EFF',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    upgradeText: {
        color: '#329EFF',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center'
    },
});