import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MainContent() {
    const navigation = useNavigation();
    return (
        <View style={styles.centerContent}>
            <FontAwesome6 name='dumbbell' size={40} style={styles.defaultPadding} />
            <Text style={[styles.defaultPadding, styles.startText]}>운동 시작해 볼까요?</Text>
            <Pressable style={[styles.defaultPadding, styles.startButton]} onPress={() => toSetWorkout()}>
                <Text style={styles.startButton_text}>운동 시작하기</Text>
            </Pressable>
            <Text style={[styles.defaultPadding, styles.skipText]} onPress={() => navigation.navigate('Record')}>하루 쉬어가기</Text>
        </View>
    );

    function toSetWorkout() {
        navigation.navigate('SetWorkout');
    }
}

const styles = StyleSheet.create({
    centerContent: {
        alignItems: 'center',
        paddingVertical: 20,
        marginVertical: 20,
    },
    defaultPadding: {
        paddingVertical: 10,
    },
    startText: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 30,
    },
    startButton: {
        backgroundColor: '#329EFF',
        width: '60%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton_text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    skipText: {
        color: '#A3B6C9',
        textDecorationLine: 'underline'
    }
});