import { Pressable, StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

export default function Record() {
    const navigation = useNavigation();

    const today = new Date();
    const dateText = today.getMonth() + 1 + "월 " + today.getDate() + "일";
    const [activeIndex, setActiveIndex] = useState(0);

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

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <View style={styles.topBar}>
                    <Ionicons name="caret-back-outline" size={30} color="black" onPress={() => navigation.goBack()} />
                    <Text style={{ fontWeight: '800', fontSize: 16 }}>{dateText}</Text>
                    <AntDesign name="menu" size={24} color="black" />
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.topInfo}>
                            <View style={styles.topInfo_left}>
                                <Text style={[styles.topInfo_left_text, { color: "#329EFF" }]}>1</Text>
                                <Text style={styles.topInfo_left_text}>팔</Text>
                                <Text style={styles.topInfo_left_text}>|</Text>
                                <Text style={styles.topInfo_left_text}>케이블 푸쉬 다운</Text>
                            </View>
                            <View style={styles.topInfo_right}>
                                <AntDesign name="info-circle" size={24} color="black" style={styles.topInfo_right_text} />
                                <Ionicons name="ellipsis-vertical" size={18} color="black" style={styles.topInfo_right_text} />
                            </View>
                        </View>
                        <View style={styles.volumeHeader}>
                            <Text>종목 볼륨</Text>
                            <Text>0kg</Text>
                            <Text>|</Text>
                            <Text>1:30</Text>
                        </View>
                        <View style={styles.memoContainer}>
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
                        <View style={styles.setContainer}>
                            <View style={styles.setContainer_item}>
                                <Text style={styles.setContainer_item_text}>1</Text>
                            </View>
                            <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                <Text style={styles.setContainer_item_text}>0</Text>
                            </View>
                            <View style={[styles.setContainer_item, styles.setContainer_item_main]}>
                                <Text style={styles.setContainer_item_text}>0</Text>
                            </View>
                            <View style={styles.setContainer_item}>
                                <AntDesign name="check" size={24} color="black" style={styles.setContainer_item_text} />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonContainer_btn}>
                                <AntDesign name="minus" size={20} color="#8899AB" />
                                <Text style={[{color:"#8899AB"}, styles.buttonContainer_btn_text]}>세트제거</Text>
                            </View>
                            <View style={styles.buttonContainer_btn}>
                                <AntDesign name="plus" size={20} color="#329EFF" />
                                <Text style={[{color:"#329EFF"}, styles.buttonContainer_btn_text]}>세트추가</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        backgroundColor: '#ffffff'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        alignItems: 'center'
    },
    scrollContainer: {
        backgroundColor: "#F3F4F6"
    },
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginVertical: 20,
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
    memoContainer: {
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
        fontWeight: '800'
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
    }

});