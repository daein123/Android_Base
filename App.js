import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import Header from './component/header';
import DateSelection from './component/date_selection';
import MainContent from './component/mainContent';
import ItemBox from './component/itemcontent';

export default function App() {
    return (
        <LinearGradient colors={['#ffffff', '#dceeff', '#ffffff']}
            style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar style="auto" />
                <Header />
                <DateSelection />
                <MainContent />
                <ItemBox />
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