import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function AddSelf() {
    const [checked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <View style={styles.searchBar_input}>
                    <EvilIcons name="search" size={24} color="black" style={{marginHorizontal: 5}}/>
                    <Text style={styles.searchBar_input_text}>찾으시는 운동을 검색해보세요.</Text>
                </View>
                <MaterialCommunityIcons name="card-search-outline" size={35} color="black" style={{marginLeft: 10}}/>
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
            <View style={styles.exerciseContainer}>
                <View style={styles.exerciseItem}>
                    <View style={styles.exerciseItem_left}>
                        <Pressable onPress={() => setChecked(!checked)}>
                            <Ionicons name={checked ? 'checkbox' : 'square-outline'} size={20} color={checked ? '#329EFF' : '#ccc'} />
                            <Text>등 | 풀업</Text>
                        </Pressable>
                        <Image source={require('../../assets/exercise/레그 익스텐션.jpg')} />
                    </View>
                    <View style={styles.exerciseItem_right}></View>
                </View>
            </View>
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
    }
});