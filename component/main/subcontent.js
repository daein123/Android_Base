import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SubContent() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={[{ paddingVertical: 15, paddingHorizontal: 15 }, styles.rowContent]}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="black" />
                        <Text style={{ paddingLeft: 10, fontSize: 18 }}>식단</Text>
                    </View>
                    <View style={styles.circleItem}>
                        <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                    </View>
                </View>
                <View style={[styles.rowContent, { justifyContent: 'flex-start', paddingHorizontal: 15 }]}>
                    <Text style={{ fontSize: 25, fontWeight: '600' }}>0</Text>
                    <Text style={{ paddingHorizontal: 5, color: '#8796A7', marginTop: 6 }}>kcal</Text>
                </View>
                <View style={[styles.gaugeContainer, { marginBottom: 10 }]}>
                    <View style={[styles.gaugeBar, { width: '10%' }]}></View>
                </View>
                <View style={[styles.rowContent, { paddingHorizontal: 10 }]}>
                    <View style={styles.mealSelection}>
                        <View style={styles.mealSelection_textContainer}>
                            <Text style={styles.mealSelection_circleText}>+</Text>
                        </View>
                        <Feather name="sunrise" size={40} color="#FFDFAC" style={{ marginVertical: 10 }} />
                    </View>
                    <View style={styles.mealSelection}>
                        <View style={styles.mealSelection_textContainer}>
                            <Text style={styles.mealSelection_circleText}>+</Text>
                        </View>
                        <Feather name="sun" size={40} color="#FFDFAC" style={{ marginVertical: 10 }} />
                    </View>
                    <View style={styles.mealSelection}>
                        <View style={styles.mealSelection_textContainer}>
                            <Text style={styles.mealSelection_circleText}>+</Text>
                        </View>
                        <Feather name="moon" size={40} color="#FFDFAC" style={{ marginVertical: 10 }} />
                    </View>
                    <View style={styles.mealSelection}>
                        <View style={styles.mealSelection_textContainer}>
                            <Text style={styles.mealSelection_circleText}>+</Text>
                        </View>
                        <MaterialCommunityIcons name="candy" size={40} color="#FFDFAC" style={{ marginVertical: 10 }} />
                    </View>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <Feather name="target" size={16} color="#5eb5f8" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>운동 목표</Text>
                    </View>
                    <Text style={{color: '#858d96', fontSize: 13}}>주간 운동 목표를 설정해주세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
            <View style={[styles.subContainer, {height: 100}]}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <MaterialIcons name="monitor-weight" size={16} color="#C57CFF" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>체중</Text>
                    </View>
                    <Text style={{fontSize: 15, marginBottom: 5}}>-- KG</Text>
                    <Text style={{color: '#858d96', fontSize: 13}}>신체 데이터를 입력해주세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
            <View style={styles.subContainer}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <MaterialCommunityIcons name="file-refresh-outline" size={16} color="#858d96" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>루틴</Text>
                    </View>
                    <Text style={{color: '#858d96', fontSize: 13}}>자주 사용하는 운동을 루틴으로 관리하세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
            <View style={styles.subContainer}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <MaterialIcons name="folder" size={24} color="#84C5FF" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>라이브러리</Text>
                    </View>
                    <Text style={{color: '#858d96', fontSize: 13}}>나만의 운동 라이브러리를 만드세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
            <View style={styles.subContainer}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <MaterialIcons name="folder-copy" size={24} color="#FFE6BD" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>프로그램</Text>
                    </View>
                    <Text style={{color: '#858d96', fontSize: 13}}>프로그램에 참여하고 한 단계 성장하세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
            <View style={styles.subContainer}>
                <View>
                    <View style={{flexDirection: 'row', paddingVertical: 10, alignItems:'center'}}>
                        <MaterialIcons name="av-timer" size={24} color="#8794A2" />
                        <Text style={{marginLeft: 5, fontSize: 16, fontWeight: '600'}}>인터벌 타이머</Text>
                    </View>
                    <Text style={{color: '#858d96', fontSize: 13}}>인터벌 훈련을 해보세요</Text>
                </View>
                <View style={[styles.circleItem, {marginTop: 5}]}>
                    <AntDesign name="arrow-right" size={18} color="#acb1b8" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'column'
    },
    content: {
        width: '90%',
        height: 200,
        borderRadius: 15,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    circleItem: {
        borderWidth: 1,
        borderColor: '#acb1b8',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gaugeContainer: {
        width: '95%',
        backgroundColor: '#E7EBEE',
        height: 15,
        borderRadius: 10,
        marginTop: 5
    },
    gaugeBar: {
        backgroundColor: '#5eb5f8',
        height: 15,
        borderRadius: 10,
    },
    mealSelection: {
        width: '100%',
        flexDirection: 'row',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#bfc4c7',
        borderRadius: 10,
        flex: 1,
        height: 70,
        marginHorizontal: 3,
        overflow: 'hidden',
    },
    mealSelection_textContainer: {
        width: 25,
        height: 25,
        backgroundColor: '#000000',
        borderRadius: 17,
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    mealSelection_circleText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#ffffff',
    },


    subContainer: {
        height: 80,
        width: '90%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        marginVertical: 5,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
});