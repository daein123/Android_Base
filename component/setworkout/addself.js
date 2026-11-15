import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { exerciseList } from './exerciseData'
import { useNavigation } from '@react-navigation/native';


export default function AddSelf() {
    const navigation = useNavigation(); // 화면 전환

    const [checked, setChecked] = useState(false);
    // 0: 북마크, 1: 전체, 2: 하체, 3: 가슴, 4: 등....
    const [showExerciseType, setShowExerciseType] = useState(1);

    const [exList, setExList] = useState([]);

    const [workout, setWorkout] = useState([]); // record로 보낼 운동들 (일단은 name으로 보내기)
    const [workoutCategory, setWorkoutCategory] = useState([]);

    useEffect(() => {
        const exerciseImages = {
            '백스쿼트': require('../../assets/exercise/백스쿼트.jpg'),
            '레그 익스텐션': require('../../assets/exercise/레그 익스텐션.jpg'),
            '레그컬': require('../../assets/exercise/레그컬.jpg'),
            '루마니안 데드리프트': require('../../assets/exercise/루마니안 데드리프트.jpg'),

            '벤치프레스': require('../../assets/exercise/벤치프레스.jpg'),
            '인클라인 덤벨 프레스': require('../../assets/exercise/인클라인 덤벨 프레스.jpg'),
            '어시스트 딥스': require('../../assets/exercise/어시스트 딥스.jpg'),

            '풀업': require('../../assets/exercise/풀업.jpg'),
            '롱풀': require('../../assets/exercise/롱풀.jpg'),
            '컨벤셔널 데드리프트': require('../../assets/exercise/컨벤셔널 데드리프트.jpg'),

            '사이드 레터럴 레이즈': require('../../assets/exercise/사이드 레터럴 레이즈.jpg'),

            '케이블 푸쉬 다운': require('../../assets/exercise/케이블 푸쉬 다운.jpg'),
        };
        async function loadExercise() {
            const res = await fetch('http://192.168.0.2:8080/api/exercise');
            const data = await res.json();
            console.log(data);

            setExList(data.map((e) => {
                return { ...e, checked: false, image: exerciseImages[e.name]}
            }));
        }
        loadExercise();
    }, [])

    // exList에 check 값을 반영하는 함수
    function updateChecked(exName) {
        const list = exList.map((item) => {
            if (exName === item.name) {
                updateWorkout(exName, !item.checked);
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setExList(list);
    }

    // record.js로 보낼 운동들에 대하여 workout 변수에 설정하는 함수
    function updateWorkout(exName, checked) {
        const arr = workout.filter((item) => item !== exName);
        if (checked === false) setWorkout(arr);
        else setWorkout([...arr, exName]);
    }

    // Record.js에서 활용할 수 있도록 log, Record 객체 만들어 보내기
    function getWorkout(data) {
        const log = {
            id: data.id,
            date: data.logDate,
            memo: ""
        };
        return [exList.filter((item) => item.checked), log];
    }

    async function saveInitLog() {
        // const logId = Math.floor(Math.random() * 100000); // 5자리 무작위 숫자
        const dateObj = new Date();
        const getMonth = String(dateObj.getMonth() + 1);
        let normalMonth = getMonth.length === 1 ? "0" + getMonth : getMonth;
        const getDate = String(dateObj.getDate());
        let normalDate = getDate.length === 1 ? "0" + getDate : getDate;

        const log = {
            id: 0,
            date: dateObj.getFullYear() + "-" + normalMonth + "-" + normalDate,
            memo: ""
        };

        const res = await fetch("http://192.168.0.2:8080/api/log/initSave", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(log),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data;
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.searchBar_input}>
                    <EvilIcons name="search" size={24} color="black" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.searchBar_input_text}>찾으시는 운동을 검색해보세요.</Text>
                </View>
                <MaterialCommunityIcons name="card-search-outline" size={35} color="black" style={{ marginLeft: 10 }} />
            </View>
            <ScrollView
                style={styles.tabScroll}
                contentContainerStyle={styles.tabContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.tabContainer_item}><FontAwesome name="bookmark" size={19} color="#329EFF" /></View>
                <View style={styles.tabContainer_item}><Text>전체</Text></View>
                <View style={styles.tabContainer_item}><Text>하체</Text></View>
                <View style={styles.tabContainer_item}><Text>가슴</Text></View>
                <View style={styles.tabContainer_item}><Text>등</Text></View>
                <View style={styles.tabContainer_item}><Text>어깨</Text></View>
                <View style={styles.tabContainer_item}><Text>복근</Text></View>
                <View style={styles.tabContainer_item}><Text>유산소</Text></View>
            </ScrollView>
            <View style={styles.sortContainer}>
                <Text>빈도순</Text>
                <AntDesign name="caret-down" size={20} color="black" />
            </View>
            <ScrollView contentContainerStyle={styles.exerciseContainer} showsVerticalScrollIndicator={false}>
                {exList.map((item) => (
                    <View key={item.name} style={styles.exerciseItem}>
                        <View style={styles.exerciseItem_left}>
                            <Pressable onPress={() => updateChecked(item.name)}>
                                <Ionicons name={item.checked ? 'checkbox' : 'square-outline'} size={20} color={item.checked ? '#329EFF' : '#ccc'} />
                            </Pressable>
                            <Image source={item.image} contentFit="cover" style={{ width: 60, height: 60 }} />
                            <Text>{item.category} | {item.name}</Text>
                        </View>
                        <View style={styles.exerciseItem_right}>
                            <Text style={{ marginHorizontal: 5, fontSize: 16 }}>0</Text>
                            <FontAwesome name="bookmark" size={22} color="#329EFF" style={{ marginHorizontal: 5 }} />
                            <AntDesign name="info-circle" size={24} color="#516273" style={{ marginHorizontal: 5 }} />
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomContainer_left}>
                    <AntDesign name="plus" size={20} color="#556678" />
                </View>
                <Pressable style={[styles.bottomContainer_right, { backgroundColor: (workout.length > 0 ? '#329EFF' : '#E7EBEE') }]}
                    onPress={async () => { if (workout.length > 0) navigation.navigate('Record', getWorkout(await saveInitLog())); }}>
                    <Text style={[styles.bottomContainer_right_text, { color: (workout.length > 0 ? '#ffffff' : '#C2CAD4') }]}>
                        운동을 선택해 주세요
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        marginVertical: 10,
    },
    searchBar_input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        flex: 1,
        borderRadius: 5,
        width: '100%'
    },
    searchBar_input_text: {
        textAlign: 'center',
        fontSize: 17,
        height: '100%',
        lineHeight: 40,
        fontSize: 14,
        color: '#858d96'
    },
    tabScroll: {
        height: 30,
        flexGrow: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        height: 30
    },
    tabContainer_item: {
        width: 55,
        height: 28,
        borderWidth: 1,
        borderColor: '#E7EAEC',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#E7EAEC'
    },
    exerciseContainer: {
        flex: 1,
    },
    exerciseItem: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#E7EAEC',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    exerciseItem_left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    exerciseItem_right: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    bottomContainer: {
        height: 50,
        flexDirection: 'row',
        marginVertical: 10,
        gap: 5,
    },
    bottomContainer_left: {
        borderColor: '#CDD4DA',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer_right: {
        flex: 4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7EBEE'
    },
    bottomContainer_right_text: {
        fontSize: 20,
        fontWeight: '700'
    },
});