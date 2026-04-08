import { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, Button} from 'react-native'
import { NoteType, removeNote } from "../store/noteSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { StackParamList } from '../../App';
import { useDispatch } from 'react-redux';

interface NoteCardProps {
    item: NoteType, 
    navigator: NativeStackNavigationProp<StackParamList, "ListScreen">
}


export default function NoteCard(props: NoteCardProps) {
    const content = props.item.content.length>20? props.item.content.slice(0, 19) + "...":props.item.content
    const noteID = props.item.id
    const navigator = props.navigator
    const dispatch = useDispatch()

    function onCardPress() {
        navigator.navigate('SingleNote', {id: noteID})
    }

    return (<View 
        style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: 10
            }}>
        <TouchableOpacity onPress={onCardPress}>
            <Text>{content}</Text>
        </TouchableOpacity>
        <Button 
            title='Delete'
            onPress={() => dispatch(removeNote(noteID))}
        />
    </View>)
}