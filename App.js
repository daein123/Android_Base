import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import MainPage from './component/main/_main';
// import BottomBar from './component/main/bottombar';
import SetWorkout from './component/setworkout/_setworkout';
import History from './component/setworkout/history';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './component/record/record';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
    useEffect(() => {
        const sub = Keyboard.addListener('keyboardDidHide', () => Keyboard.dismiss());
        return () => sub.remove();
    }, []);
    return (
        // SetWorkoutP
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <NavigationContainer onPress={Keyboard.dismiss}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Main" component={MainPage}></Stack.Screen>
                    <Stack.Screen name="SetWorkout" component={SetWorkout}></Stack.Screen>
                    <Stack.Screen name="History" component={History}></Stack.Screen>
                    <Stack.Screen name="Record" component={Record}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    mainContainer: {
        flex: 1,
    },
});