import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import Header from './component/main/header';
import DateSelection from './component/main/date_selection';
import MainContent from './component/main/mainContent';
import ItemBox from './component/main/itemcontent';
import MainPage from './component/main/_main';

export default function App() {
    return (
        <LinearGradient colors={['#ffffff', '#dceeff', '#F1F2F4']}
            style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="auto" />
                <MainPage></MainPage>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: '#fff',
    },
});