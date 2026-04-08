import { View, FlatList, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addNote, noteSelector } from "../store/noteSlice";
import { NoteType } from "../store/noteSlice";
import NoteCard from "../components/NoteCard";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";

export type ListScreenProps = NativeStackScreenProps<StackParamList, "ListScreen">;

interface FlatListItem {
    item: NoteType,
    index: number
}

export default function ListScreen({navigation}:ListScreenProps){
    const notes = useSelector(noteSelector)
    const dispatch = useDispatch()

    const onAddNewNotes = () => {
        let id = Date.now().toString();
        dispatch(addNote({content : "", id: id}))
        navigation.navigate('SingleNote', {id: id}) 
    }
    
    
    return (
        <View style={{marginTop: 50}}>
            <Button
            title={"Create note"} onPress={onAddNewNotes}></Button>
            <FlatList 
                data={notes.notes}
                renderItem={(item: FlatListItem) => 
                <NoteCard 
                    item={item.item}
                    navigator={navigation}
                    />}
                keyExtractor={(item: NoteType, index: number) => item.id}
            />
            
        </View>
    );
}