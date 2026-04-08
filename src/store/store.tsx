import {combineReducers, configureStore} from '@reduxjs/toolkit';
import noteReducer from './noteSlice';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'notes', 
    storage: AsyncStorage
} // Préciser quel storage on utilise

const rootReducer = combineReducers({
    notes: persistReducer(persistConfig, noteReducer)
}) // on modifie les reducers pour leur donner la persist config

export const store = configureStore ({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    })
}) // middleware : spécifier comment on sauve/lit le state


export const persistor = persistStore(store) 
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
