import DateSelection from "./date_selection";
import Header from "./header";
import MainContent from "./mainContent";
import ItemBox from "./itemcontent";
import SubContent from "./subcontent";
import { ScrollView } from 'react-native';

export default function MainPage() {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            <Header />
            <DateSelection />
            <MainContent />
            <ItemBox />
            <SubContent />
        </ScrollView>
    );
}