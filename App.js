import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './component/header';
import DateSelection from './component/date_selection';

export default function App() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="auto" />
            <Header />
            <DateSelection />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
});