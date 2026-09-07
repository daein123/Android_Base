import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import MainPage from './component/main/_main';
// import BottomBar from './component/main/bottombar';
import SetWorkout from './component/setworkout/_setworkout';
import History from './component/setworkout/history';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    // const mainP = (
    //     <View style={styles.mainContainer}>
    //         <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
    //             <LinearGradient colors={['#ffffff', '#dceeff', '#F1F2F4']}
    //                 style={{ flex: 1 }}>
    //                 <StatusBar style="auto" />
    //                 <MainPage></MainPage>
    //             </LinearGradient>
    //             <BottomBar />
    //         </SafeAreaView>
    //     </View>
    // );
    const SetWorkoutP = (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <SetWorkout />
            </SafeAreaView>
        </View>
    )
    return (
        // SetWorkoutP
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown : false }}>
                <Stack.Screen name="Main" component={MainPage}></Stack.Screen>
                <Stack.Screen name="SetWorkout" component={SetWorkout}></Stack.Screen>
                <Stack.Screen name="History" component={History}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
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