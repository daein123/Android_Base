import DateSelection from "./date_selection";
import Header from "./header";
import MainContent from "./mainContent";
import ItemBox from "./itemcontent";
import SubContent from "./subcontent";
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import BottomBar from './bottombar';

export default function MainPage({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <LinearGradient colors={['#ffffff', '#dceeff', '#F1F2F4']}
                    style={{ flex: 1 }}>
                    <StatusBar style="auto" />
                    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                        <Header />
                        <DateSelection />
                        <MainContent />
                        <ItemBox />
                        <SubContent />
                    </ScrollView>
                </LinearGradient>
                <BottomBar />
            </SafeAreaView>
        </View>
    );
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