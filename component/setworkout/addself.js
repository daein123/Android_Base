import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { exerciseList } from './exerciseData'


export default function AddSelf() {
    const [checked, setChecked] = useState(false);
    // 0: 북마크, 1: 전체, 2: 하체, 3: 가슴, 4: 등....
    const [showExerciseType, setShowExerciseType] = useState(1);
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.searchBar_input}>
                    <EvilIcons name="search" size={24} color="black" style={{ marginHorizontal: 5 }} />
                    <Text style={styles.searchBar_input_text}>찾으시는 운동을 검색해보세요.</Text>
                </View>
                <MaterialCommunityIcons name="card-search-outline" size={35} color="black" style={{ marginLeft: 10 }} />
            </View>
            <ScrollView contentContainerStyle={styles.tabContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                {exerciseList.map((item) => (
                    <View key={item.name} style={styles.exerciseItem}>
                        <View style={styles.exerciseItem_left}>
                            <Pressable onPress={() => setChecked(!checked)}>
                                <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={20} color={checked ? '#329EFF' : '#ccc'} />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    tabContainer: {
        flexDirection: 'row',
        overflow: 'hidden'
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
        // backgroundColor: 'blue',
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
    }
});