import { View, TextInput, Button } from "react-native"
import { noteSelector } from "../store/noteSlice"
import { useEffect, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { setNoteContent } from "../store/noteSlice";

type NoteProps = NativeStackScreenProps<StackParamList, "SingleNote">;

export default function Note({navigation, route}: NoteProps){
    const noteID = route.params.id;
    const notes = useSelector(noteSelector)
    const curNote = notes.notes.find(note => note.id === noteID)
    const [noteText, setNoteText] = useState<string>(curNote? curNote.content : "")
    const dispatch = useDispatch()

    function updateNoteContent(newText: string){
        setNoteText(newText)
        dispatch(setNoteContent({id: noteID, content: newText}))
    }       

    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <TextInput 
                value={noteText} 
                onChangeText={updateNoteContent}
                placeholder="Enter your note here"
            />
            <Button title="Go back" onPress={() => navigation.goBack()}/>
        </View>
    )
}