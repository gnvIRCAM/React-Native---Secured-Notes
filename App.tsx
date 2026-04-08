import {createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import {store, persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { isPasswordSet } from './src/utils/secureStorage';
import { useEffect, useState } from 'react';

import ListScreen from './src/screens/ListScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import CheckPasswordScreen from './src/screens/CheckPasswordScreen';
import Note from './src/components/Note';

export type StackParamList = {
    Home: undefined, 
    ListScreen: undefined, 
    SingleNote: { id: string }
}

export default function App() {
  const Stack = createNativeStackNavigator<StackParamList>()
  const [selectPassword, setSelectPassword] = useState<boolean>(false)
  
  useEffect(()=>{
    const check = async () => {
      const passwordIsSet = await isPasswordSet()
      setSelectPassword(!passwordIsSet)
    }
    check()
  }, [])

  // persistor pour recharger l'app dans un state donné

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}> 
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {selectPassword ? (
              <Stack.Screen name="Home" component={PasswordScreen} />
            ) : (
              <Stack.Screen name="Home" component={CheckPasswordScreen} />
            )}
            <Stack.Screen 
              name={'ListScreen'} 
              component={ListScreen}/>
            <Stack.Screen 
              name={'SingleNote'} 
              component={Note}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}
