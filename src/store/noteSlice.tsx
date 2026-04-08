import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from './store'

export interface NoteType {
    content: string,
    id: string
}

type NotesState = {notes : Array<NoteType>}
const initialState: NotesState = {notes: []}

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addNote: (state, action: PayloadAction<NoteType>) => 
            {state.notes.push(action.payload)}, 
        removeNote: (state, action: PayloadAction<string>) => 
            {state.notes = state.notes.filter(note => note.id!==action.payload)}, 
        setNoteContent: (state, action: PayloadAction<{id: string, content: string}>) => {
            const {id, content} = action.payload
            const noteIndex = state.notes.findIndex(note => note.id === id)
            if(noteIndex !== -1){
                state.notes[noteIndex].content = content
            }
        }
    }
}) 

export const {addNote, removeNote, setNoteContent} = notesSlice.actions; 
export const noteSelector = (state: RootState) => state.notes;

export default notesSlice.reducer;   
