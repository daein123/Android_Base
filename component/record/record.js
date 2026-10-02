import { Pressable, StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from 'react';
import DottedBorderContainer from './dotted';
import Checkbox from 'expo-checkbox';

export default function Record() {
    // route 
    const route = useRoute();

    // route params - log 세팅
    const [log, setLog] = useState(route.params[1]);
    // console.log(route.params[1]);

    // route params - record 배열 객체 세팅
    const recordArr = initRecord(route.params[0], log);
    const [record, setRecord] = useState(recordArr);

    // 초기 set 객체 배열 세팅
    const setArr = initSet(recordArr);
    const [set, setSet] = useState(setArr);


    const navigation = useNavigation();

    const today = new Date();
    const dateText = today.getMonth() + 1 + "월 " + today.getDate() + "일";
    const [activeIndex, setActiveIndex] = useState(0);
    const [allCheck, setAllCheck] = useState(false);

    const tempObj = [
        {
            order: 1,
            type: "팔",
            name: '케이블 푸시 다운',
            totalVolume: '0',
            restTime: '1:30',
            memo: {
                date: '26-05-30',
                content: '드롭으로 진행'
            },
            set: {
                1: { kg: 0, rep: 0, check: false }
            }
        },
        {
            order: 2,
            type: "팔2",
            name: '케이블 푸시 다운2',
            totalVolume: '0',
            restTime: '1:30',
            memo: {
                date: '26-05-30',
                content: '드롭으로 진행'
            },
            set: {
                1: { kg: 0, rep: 0, check: false }
            }
        },
        {
            order: 3,
            type: "팔3",
            name: '케이블 푸시 다운3',
            totalVolume: '0',
            restTime: '1:30',
            memo: {
                date: '26-05-30',
                content: '드롭으로 진행'
            },
            set: {
                1: { kg: 0, rep: 0, check: false }
            }
        }
    ];

    const [currentTotal, setCurrentTotal] = useState(0);    // 현재 일지의 모든 운동량
    const [beforeTotal, setBeforeTotal] = useState(0);      // TODO: 오늘 기준 일주일 전의 운동량 받아오기 (DB 완성 시)

    function initRecord(recordArr, logObj) {
        var arr = [];
        var cnt = 0;
        recordArr.forEach((item) => {
            var obj = {
                logId: logObj.id,
                id: Math.floor(Math.random() * 100000),
                category: item.category,
                name: item.name,
                order: cnt++,
                restTime: item.restTime,
                totalVolume: 0, // rep * weight 값
            };
            arr.push(obj);
        });
        // console.log(arr);
        return arr;
    }
    function initSet(recordArr) {
        var obj = {};
        recordArr.forEach((item) => {
            obj[item.id] = []
            var result = {
                id: Math.floor(Math.random() * 100000),
                recordId: item.id,
                order: 0,
                weight: 0,
                rep: 0,
                pre: 0,
                checked: false,
            }
            obj[item.id].push(result);
        });
        // console.log(obj);
        return obj;
    }

    function addSet(recordId) {
        var sets = set[recordId];
        var last = sets[sets.length - 1];

        var newItem = {
            id: Math.floor(Math.random() * 10000),
            recordId: recordId,
            order: last.order + 1,
            weight: 0,
            rep: 0,
            pre: 0,
            checked: false
        };
        setSet({ ...set, [recordId]: [...sets, newItem] });
    }

    function removeSet(recordId, recordIndex) {
        var sets = set[recordId];
        if (sets.length === 1) return;
        const newSets = { [recordId]: sets.slice(0, -1) };
        const volumn = newSets[recordId].reduce((total, s) => total + Number(s.rep) * Number(s.weight), 0);
        const newRecord = record.map((r, idx) => recordIndex === idx ? { ...r, totalVolume: volumn } : r);

        setSet({ ...set, ...newSets });
        setRecord(newRecord);
        updateC_TotalVolumn(newRecord);
    }

    function updateSetValue(recordId, setId, type, text, recordIndex) {
        const sets = set[recordId];
        const newSets = sets.map((s) => s.id === setId ? { ...s, [type]: text } : s);
        const volumn = newSets.reduce((total, s) => total + Number(s.rep) * Number(s.weight), 0);
        const newRecord = record.map((r, idx) => recordIndex === idx ? { ...r, totalVolume: volumn } : r);

        setSet({ ...set, [recordId]: newSets });
        setRecord(newRecord);
        updateC_TotalVolumn(newRecord);
    }

    function setCheck(recordId, setId) {
        const sets = set[recordId];
        const newSets = sets.map((s) => s.id === setId ? { ...s, checked: !s.checked } : s);
        setSet({ ...set, [recordId]: newSets });
    }

    // currentTotalVolumn 계산 함수
    function updateC_TotalVolumn(recordObj) {
        const volumn = recordObj.reduce((total, item) => total + Number(item.totalVolume), 0);
        setCurrentTotal(volumn);
    }

    // Log 객체의 메모를 갱신
    function setLogMemo(text) {
        setLog({ ...log, memo: text });
    }

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.topBar}>
                    <Ionicons name="caret-back-outline" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={{ fontWeight: '800', fontSize: 16 }}>{dateText}</Text>
                    <AntDesign name="menu" size={24} color="black" />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.totalVolume}>
                        <Text style={styles.totalVolume_left_text}>전체 볼륨</Text>
                        <View style={styles.totalVolume_right}>
                            <Text style={styles.totalVolume_right_text}>{currentTotal}kg</Text>
                            <Text style={[styles.totalVolume_right_text, { color: ((currentTotal - beforeTotal) >= 0 ? "#329EFF" : "#E95E65") }]}>
                                {(currentTotal - beforeTotal) >= 0 ? "+" : ""}{currentTotal - beforeTotal}kg
                            </Text>
                        </View>
                    </View>
                    {record.map((item, recordIndex) => {
                        const itemSet = set[item.id];
                        return (
                            <View key={item.id} style={styles.container}>
                                <View style={styles.topInfo}>
                                    <View style={styles.topInfo_left}>
                                        <Text style={[styles.topInfo_left_text, { color: "#329EFF" }]}>{(item.order) + 1}</Text>
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
                                    <Text>{item.totalVolume}kg</Text>
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
                                {itemSet.map((setItem) => {
                                    return (
                                        <View key={setItem.id} style={styles.setContainer}>
                                            <View style={styles.setContainer_item}>
                                                <Text style={styles.setContainer_item_text}>{(setItem.order) + 1}</Text>
                                            </View>
                                            <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                                <TextInput keyboardType='numeric' style={[styles.setContainer_item_textInput, { height: 40 }]}
                                                    onChangeText={(text) => updateSetValue(item.id, setItem.id, 'weight', text, recordIndex)}
                                                    selectTextOnFocus={true}
                                                    value={setItem.weight.toString()} />
                                            </View>
                                            <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                                <TextInput keyboardType='numeric' style={[styles.setContainer_item_textInput, { height: 40 }]}
                                                    onChangeText={(text) => updateSetValue(item.id, setItem.id, 'rep', text, recordIndex)}
                                                    selectTextOnFocus={true}
                                                    value={setItem.rep.toString()} />
                                            </View>
                                            <Pressable
                                                style={[styles.setContainer_item, { backgroundColor: (setItem.checked ? '#329EFF' : '#F3F4F6') }]}
                                                onPress={() => setCheck(item.id, setItem.id)}
                                            >
                                                <AntDesign name="check" size={24} style={[styles.setContainer_item_text, { color: (setItem.checked ? "#ffffff" : '#8496A8') }]} />
                                            </Pressable>
                                        </View>);
                                })}
                                <View style={styles.buttonContainer}>
                                    <Pressable style={styles.buttonContainer_btn} onPress={() => removeSet(item.id, recordIndex)}>
                                        <AntDesign name="minus" size={20} color="#8899AB" />
                                        <Text style={[{ color: "#8899AB" }, styles.buttonContainer_btn_text]}>세트제거</Text>
                                    </Pressable>
                                    <Pressable style={styles.buttonContainer_btn} onPress={() => addSet(item.id)}>
                                        <AntDesign name="plus" size={20} color="#329EFF" />
                                        <Text style={[{ color: "#329EFF" }, styles.buttonContainer_btn_text]}>세트추가</Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    })}
                    <DottedBorderContainer style={styles.addContainer} color="#CED5DC" strokeWidth={3} borderRadius={12}>
                        <View style={styles.addContainer_view}>
                            <AntDesign name="plus" size={20} color="#329EFF" />
                            <Text style={styles.addContainer_text}>운동 추가</Text>
                        </View>
                    </DottedBorderContainer>
                    <View style={styles.memoContainer}>
                        <Text style={styles.memoContainer_title}>
                            메모
                        </Text>
                        <TextInput style={styles.memoContainer_content} multiline={true} placeholder={(log.memo ? log.memo : "오늘 운동은 어땠나요?\n운동 후기를 간단히 적어보세요")}
                            selectTextOnFocus={true}
                            onChangeText={(text) => setLogMemo(text)}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.allCheckContainer}>
                        <Checkbox style={styles.allCheckContainer_checkbox} color='#329EFF' onValueChange={() => { console.log(allCheck); setAllCheck(!allCheck); }} value={allCheck} />
                        <Text style={styles.allCheckContainer_text}>세트 전체 체크</Text>
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
                    <View style={styles.bottomContainer_right}>
                        <Text style={{ fontSize: 19, fontWeight: '600', color: '#ffffff' }}>편집 완료</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: '#fff',
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
        fontSize: 16,
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
        backgroundColor: 'color',
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
    allCheckContainer_checkbox: {
    },
    allCheckContainer_text: {

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
        alignContent: 'center',
        justifyContent: 'center',
    },
    bottomContainer_left_item_text: {
        fontSize: 15,
    },
    divider: {
        width: 1,
        backgroundColor: '#d3d4d4',
        height: '30',

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