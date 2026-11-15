import { Pressable, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import DottedBorderContainer from './dotted';
import Checkbox from 'expo-checkbox';

const makeKey = () => Math.random().toString(36).slice(2);

function initSet(order) {
    return { key: makeKey(), order, weight: 0, rep: 0, pre: 0, checked: false };
}

function initRecord(exercises) {
    return exercises.map((item, index) => ({
        key: makeKey(),
        exerciseId: item.id,
        name: item.name,
        category: item.category,
        order: index,
        restTime: item.restTime,
        set: [initSet(0)],
    }));
}

// route.params = [선택한 운동 목록, 서버에서 받은 일지]
function initLog(params) {
    return { ...params[1], record: initRecord(params[0]) };
}

// 서버(PUT /api/saveLog)로 보낼 모양: 화면용 값(key, name, category)은 빼고 입력값은 숫자로
async function toPayload(log) {
    const data = {
        id: log.id,
        date: log.date,
        memo: log.memo,
        record: log.record.map((r) => ({
            exerciseId: r.exerciseId,
            logId: log.id,
            sortOrder: r.order,
            restTime: r.restTime,
            set: r.set.map((s) => ({
                sortOrder: s.order,
                weight: Number(s.weight),
                rep: Number(s.rep),
                pre: s.pre,
                checked: s.checked,
            })),
        })),
    };

    const res = await fetch('http://192.168.0.2:8080/api/saveLog', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }
    );
    return data;
}

export default function Record() {
    const route = useRoute();
    const navigation = useNavigation();

    const [log, setLog] = useState(() => initLog(route.params));
    const [beforeTotal, setBeforeTotal] = useState(0); // TODO: 오늘 기준 일주일 전의 운동량 받아오기 (DB 완성 시)

    const today = new Date();
    const dateText = today.getMonth() + 1 + "월 " + today.getDate() + "일";

    // 볼륨과 전체 체크 여부는 state에 두지 않고 렌더할 때마다 세트로 계산
    const volumes = {};
    let currentTotal = 0;
    let isAllCheck = true;
    log.record.forEach((r) => {
        volumes[r.key] = r.set.reduce((t, s) => t + s.weight * s.rep, 0);
        currentTotal += volumes[r.key];
        if (r.set.some((s) => !s.checked)) isAllCheck = false;
    });

    // recordKey에 해당하는 기록의 세트 배열만 바꿔치기
    function updateSets(recordKey, makeNewSets) {
        setLog((prev) => ({
            ...prev,
            record: prev.record.map((r) =>
                r.key !== recordKey ? r : { ...r, set: makeNewSets(r.set) }
            ),
        }));
    }

    function addSet(recordKey) {
        updateSets(recordKey, (sets) => [...sets, initSet(sets.length)]);
    }

    function removeSet(recordKey) {
        updateSets(recordKey, (sets) => (sets.length === 1 ? sets : sets.slice(0, -1)));
    }

    function updateSetValue(recordKey, setKey, type, text) {
        updateSets(recordKey, (sets) =>
            sets.map((s) => (s.key !== setKey ? s : { ...s, [type]: text }))
        );
    }

    function setCheck(recordKey, setKey) {
        updateSets(recordKey, (sets) =>
            sets.map((s) => (s.key !== setKey ? s : { ...s, checked: !s.checked }))
        );
    }

    function updateCheck(value) {
        setLog((prev) => ({
            ...prev,
            record: prev.record.map((r) => ({
                ...r,
                set: r.set.map((s) => ({ ...s, checked: value })),
            })),
        }));
    }

    function setLogMemo(text) {
        setLog((prev) => ({ ...prev, memo: text }));
    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.topBar}>
                    <Ionicons name="caret-back-outline" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={{ fontWeight: '800', fontSize: 16 }}>{dateText}</Text>
                    <AntDesign name="menu" size={24} color="black" />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode='on-drag'
                >
                    <View style={styles.totalVolume}>
                        <Text style={styles.totalVolume_left_text}>전체 볼륨</Text>
                        <View style={styles.totalVolume_right}>
                            <Text style={styles.totalVolume_right_text}>{currentTotal}kg</Text>
                            <Text style={[styles.totalVolume_right_text, { color: ((currentTotal - beforeTotal) >= 0 ? "#329EFF" : "#E95E65") }]}>
                                {(currentTotal - beforeTotal) >= 0 ? "+" : ""}{currentTotal - beforeTotal}kg
                            </Text>
                        </View>
                    </View>
                    {log.record.map((item) => (
                        <View key={item.key} style={styles.container}>
                            <View style={styles.topInfo}>
                                <View style={styles.topInfo_left}>
                                    <Text style={[styles.topInfo_left_text, { color: "#329EFF" }]}>{item.order + 1}</Text>
                                    <Text style={styles.topInfo_left_text}>{item.category}</Text>
                                    <Text style={styles.topInfo_left_text}>|</Text>
                                    <Text style={styles.topInfo_left_text}>{item.name}</Text>
                                </View>
                                <View style={styles.topInfo_right}>
                                    <AntDesign name="info-circle" size={24} color="black" style={styles.topInfo_right_text} />
                                    <Ionicons name="ellipsis-vertical" size={18} color="black" style={styles.topInfo_right_text} />
                                </View>
                            </View>
                            <View style={styles.volumeHeader}>
                                <Text>종목 볼륨</Text>
                                <Text>{volumes[item.key]}kg</Text>
                                <Text>|</Text>
                                <Text>{item.restTime}</Text>
                            </View>
                            {/* TODO: memo 처리 후순위 */}
                            <View style={styles.workoutMemoContainer}>
                                <Text style={{ color: '#a8b1b9', fontSize: 15, fontWeight: '700' }}>30-30-30 목</Text>
                                <Text style={{ color: '#A9B4BF' }}>드롭다운으로 함</Text>
                            </View>
                            <View style={styles.optionContainer}>
                                <View style={styles.optionButton}>
                                    <Text style={styles.optionButton_text}>↺불러오기</Text>
                                </View>
                                <View style={styles.optionButton}>
                                    <Text style={styles.optionButton_text}>⚡어시스턴트</Text>
                                </View>
                            </View>
                            <View style={styles.setHeader}>
                                <Text style={styles.setHeader_text}>세트</Text>
                                <Text style={styles.setHeader_text}>kg</Text>
                                <Text style={styles.setHeader_text}>회</Text>
                                <Text style={styles.setHeader_text}>완료</Text>
                            </View>
                            {item.set.map((setItem) => (
                                <View key={setItem.key} style={styles.setContainer}>
                                    <View style={styles.setContainer_item}>
                                        <Text style={styles.setContainer_item_text}>{setItem.order + 1}</Text>
                                    </View>
                                    <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                        <TextInput keyboardType='numeric' style={styles.setContainer_item_textInput}
                                            onChangeText={(text) => updateSetValue(item.key, setItem.key, 'weight', text)}
                                            selectTextOnFocus
                                            value={setItem.weight.toString()} />
                                    </View>
                                    <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                        <TextInput keyboardType='numeric' style={styles.setContainer_item_textInput}
                                            onChangeText={(text) => updateSetValue(item.key, setItem.key, 'rep', text)}
                                            selectTextOnFocus
                                            value={setItem.rep.toString()} />
                                    </View>
                                    <Pressable
                                        style={[styles.setContainer_item, { backgroundColor: (setItem.checked ? '#329EFF' : '#F3F4F6') }]}
                                        onPress={() => setCheck(item.key, setItem.key)}
                                    >
                                        <AntDesign name="check" size={24} style={[styles.setContainer_item_text, { color: (setItem.checked ? "#ffffff" : '#8496A8') }]} />
                                    </Pressable>
                                </View>
                            ))}
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.buttonContainer_btn} onPress={() => removeSet(item.key)}>
                                    <AntDesign name="minus" size={20} color="#8899AB" />
                                    <Text style={[{ color: "#8899AB" }, styles.buttonContainer_btn_text]}>세트제거</Text>
                                </Pressable>
                                <Pressable style={styles.buttonContainer_btn} onPress={() => addSet(item.key)}>
                                    <AntDesign name="plus" size={20} color="#329EFF" />
                                    <Text style={[{ color: "#329EFF" }, styles.buttonContainer_btn_text]}>세트추가</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                    <DottedBorderContainer style={styles.addContainer} color="#CED5DC" strokeWidth={3} borderRadius={12}>
                        <View style={styles.addContainer_view}>
                            <AntDesign name="plus" size={20} color="#329EFF" />
                            <Text style={styles.addContainer_text}>운동 추가</Text>
                        </View>
                    </DottedBorderContainer>
                    <View style={styles.memoContainer}>
                        <Text style={styles.memoContainer_title}>메모</Text>
                        <TextInput
                            style={styles.memoContainer_content}
                            multiline={true}
                            value={(log.memo ? log.memo : "오늘 운동은 어땠나요?\n운동 후기를 간단히 적어보세요")}
                            onChangeText={setLogMemo}
                        />
                    </View>
                    <View style={styles.allCheckContainer}>
                        <Checkbox color='#329EFF' onValueChange={updateCheck} value={isAllCheck} />
                        <Text>세트 전체 체크</Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomContainer_left}>
                        <View style={styles.bottomContainer_left_item}>
                            <Text style={{ fontSize: 17, fontWeight: '800', color: '#329EFF' }}>ON</Text>
                            <Text style={{ fontSize: 12, fontWeight: '800', color: '#44515C' }}>휴식 타이머</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.bottomContainer_left_item}>
                            <Text style={{ fontSize: 17, fontWeight: '800', color: '#8697A8' }}>50분</Text>
                            <Text style={{ fontSize: 12, fontWeight: '800', color: '#44515C' }}>운동 시간</Text>
                        </View>
                    </View>
                    {/* TODO: toPayload(log)를 PUT /api/saveLog로 전송 */}
                    <Pressable style={styles.bottomContainer_right} onPress={() => console.log(JSON.stringify(toPayload(log)))}>
                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#ffffff' }}>편집 완료</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    scrollContainer: {
        backgroundColor: "#F3F4F6"
    },

    totalVolume: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center'
    },
    totalVolume_left_text: {
        fontSize: 16,
        fontWeight: '700'
    },
    totalVolume_right: {
        flexDirection: 'row',
        gap: 3
    },
    totalVolume_right_text: {
        fontSize: 16,
        fontWeight: '700'
    },

    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10
    },
    topInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center'
    },
    topInfo_left: {
        flexDirection: 'row',
        gap: 5,
    },
    topInfo_left_text: {
        fontSize: 17,
        fontWeight: '500',
        color: '#3F4D5A'
    },
    topInfo_right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    topInfo_right_text: {
        color: '#556678'
    },

    volumeHeader: {
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 10,
    },
    workoutMemoContainer: {
        backgroundColor: "#F3F4F6",
        marginHorizontal: 10,
        marginVertical: 10,
        height: 60,
        borderRadius: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
        marginHorizontal: 10,
    },
    optionButton: {
        borderWidth: 0.8,
        borderRadius: 15,
        borderColor: "#329EFF",
    },
    optionButton_text: {
        color: "#329EFF",
        fontSize: 16,
        fontWeight: '500',
        paddingHorizontal: 5,
        paddingVertical: 3
    },

    setHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    setHeader_text: {
        fontSize: 16,
        width: 60,
        textAlign: 'center',
        color: '#8496A8'
    },
    setContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    setContainer_item: {
        backgroundColor: "#F3F4F6",
        width: 60,
        height: 35,
        borderRadius: 10,
    },
    setContainer_item_text: {
        textAlign: 'center',
        color: '#8496A8',
        lineHeight: 40,
        fontSize: 18,
        fontWeight: '800',
    },
    setContainer_item_textInput: {
        height: 40,
        textAlign: 'center',
        color: '#8496A8',
        fontSize: 18,
        fontWeight: '800',
    },
    setContainer_item_main: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E7EBEE',
        width: 80
    },

    buttonContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonContainer_btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    buttonContainer_btn_text: {
        fontSize: 18,
        fontWeight: '600'
    },

    addContainer: {
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
    },
    addContainer_view: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        height: 50,
        alignItems: 'center'
    },
    addContainer_text: {
        fontSize: 18,
        color: '#329EFF',
        fontWeight: '700'
    },

    memoContainer: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 5,
    },
    memoContainer_title: {
        marginTop: 10,
    },
    memoContainer_content: {
        color: '#b8b8b8'
    },

    allCheckContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
        paddingVertical: 20,
    },

    bottomContainer: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 60,
        paddingVertical: 5,
        paddingHorizontal: 15,
        gap: 5
    },
    bottomContainer_left: {
        backgroundColor: '#F3F4F6',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        gap: 3,
        borderRadius: 3,
        alignItems: 'center'
    },
    bottomContainer_left_item: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: '#d3d4d4',
    },
    bottomContainer_right: {
        backgroundColor: '#329EFF',
        flex: 1,
        justifyContent: 'space-evenly',
        gap: 3,
        borderRadius: 3,
        alignItems: 'center'
    },
});
